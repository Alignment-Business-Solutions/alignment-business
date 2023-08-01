import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Example = ({weekData, categories}) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => weekData);
    const [validationErrors, setValidationErrors] = useState({});

    //submit new item to db
    const handleCreateNewRow = (values) => {
         
    };
   
    const findeCategory = (id) => {
        for (let cat of categories){
            if (id === cat.id){
                return cat.category;
            }
        }
    };
   
    const isPaid = (value) => {
        if(value){
            return '✅';
        } else {
            return '🚫';
        }
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (!confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)) {
                return;
                }
                //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
            },
        [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                    onBlur: (event) => {
                        const isValid =
                            cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
                            ? validateAge(+event.target.value)
                            : validateRequired(event.target.value);
                        if (!isValid) {
                            //set validation error for cell if invalid
                            setValidationErrors({
                                ...validationErrors,
                                [cell.id]: `${cell.column.columnDef.header} is required`,
                            });
                        } else {
                            //remove validation error for cell if valid
                            delete validationErrors[cell.id];
                            setValidationErrors({
                                ...validationErrors,
                            });
                        }
                    },
                };
            },
        [validationErrors],
    );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'date',
        header: 'date',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        type: 'date',
        size: 80,
      },
      {
        accessorKey: 'payee',
        header: 'payee',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'amount',
        header: 'amount',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'paid',
        header: 'paid',
        Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue()
                      ? '#00ff00'
                      : '#ff0000',
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {isPaid(cell.getValue())}
              </Box>
        ),
      },
      {
            accessorKey: 'category_id',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: 'between',
            header: 'Category',
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === 1
                      ? '#00ff00'
                      : '#ff0000',
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {findeCategory(cell.getValue())}
              </Box>
            ),
        },

        ],
        [getCommonEditTextFieldProps],
    );

    return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={weekData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Account
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Account</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                        width: '100%',
                        minWidth: { xs: '300px', sm: '360px', md: '400px' },
                        gap: '1.5rem',
                        }}
                    >
                        <TextField
                            key='tes'
                            label='test'
                            name='test'
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                        />
                        <TextField
                            key='asdf'
                            label='asdf'
                            name='asdf'
                            
                        />
                       <TextField
                            key='fdas'
                            label='fdsa'
                            name='fdsa'

                        />
                        <TextField
                            key='qwer'
                            label='qwer'
                            name='qwer'

                        />
                        <TextField
                            key='rewq'
                            label='rewq'
                            name='rewq'

                        />
                         
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Example;

