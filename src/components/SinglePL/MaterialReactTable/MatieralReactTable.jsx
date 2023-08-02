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
    FormControl,
    InputLabel,
    Select,
    Checkbox,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

const Example = ({weekData, categories, weekID, clientID, accLevel}) => {
    const dispatch = useDispatch(); 
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => weekData);
    const [validationErrors, setValidationErrors] = useState({});

    //submit new item to db
    const handleCreateNewRow = (values) => {
        dispatch({type:"POST_ITEM", payload: values});
         
    };
   
    const findCategory = (id) => {
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
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            dispatch({type:"UPDATE_ITEM", payload:{data: values,
                                       week: weekID,
                                       client: clientID}});
            exitEditingMode(); //required to exit editing mode and close modal
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (!confirm(`Are you sure you want to delete ${row.getValue('payee')}`)) {
                return;
                }
                //send api delete request here, then refetch or update local table data for re-render
       dispatch({type:"DELETE_ITEM", payload: {data: row.id,
                                                week: weekID,
                                                client: clientID}});
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
            accessorKey: 'id',
            header: 'id',
            enableEditing: false


        },
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
        Edit: ({ column, row, table, cell }) => {
          const {
            getState,
            setEditingRow,
            setCreatingRow,
          } = table;

          const { creatingRow, editingRow } = getState();
          const isCreating = creatingRow?.id === row.id;
          const isEditing = editingRow?.id === row.id;
          
            const saveInputValueToRowCache = (newValue) => {
            row._valuesCache[column.id] = newValue.target.checked;
            if (isCreating) {
              setCreatingRow({ ...row });
            } else if (isEditing) {
              setEditingRow({ ...row });
            }
          };
            return (
                 <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                    <InputLabel id="paid">Paid ?</InputLabel>
                    <Checkbox 
                            label="paid?"
                            defaultChecked={cell.getValue()}
                            onChange={saveInputValueToRowCache}
                        />
                   </FormControl>
                 </Box>
            )


        },
      },
      {
        accessorKey: 'category_id',
        header: 'Category',
        size: 200,
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
            {findCategory(cell.getValue())}
          </Box>
        ),
        Edit: ({ column, row, table }) => {
          const {
            getState,
            setEditingRow,
            setCreatingRow,
          } = table;

          const { creatingRow, editingRow } = getState();
          const isCreating = creatingRow?.id === row.id;
          const isEditing = editingRow?.id === row.id;
          
            const saveInputValueToRowCache = (newValue) => {
            row._valuesCache[column.id] = newValue.target.value;
            if (isCreating) {
              setCreatingRow({ ...row });
            } else if (isEditing) {
              setEditingRow({ ...row });
            }
          };


          return (
          <Box sx={{ minWidth: 120 }}>
           <FormControl fullWidth>
             <InputLabel id="category">Category</InputLabel>
             <Select
               labelId="category"
               id="categorySelect"
               value={row.original.category_id}
               label="Category"
               onChange={saveInputValueToRowCache}
             >
             {categories.map(cat => (
                 <MenuItem value={cat.id}>{cat.category}</MenuItem>
             ))}
             </Select>
           </FormControl>
         </Box>
          );
        },
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
        initialState={{ columnVisibility: { id: false } }}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing={(accLevel !==0 )? true: false}
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
            Create New Item
          </Button>
        )}
      />
      <CreateNewItemModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewItemModal = ({ open, columns, onClose, onSubmit }) => {
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

