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
import ImportRegCSV from '../ImportCSV/ImportRegCSV';
import ExportCSV from '../ExportCSV/ExportCSV.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


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
            return <Checkbox readOnly checked />;
        } else {
            return <Checkbox readOnly />;
        }
    };

    const dateSplice = (value) => {
        let date = value;
        date = date.slice(0, 10);
        return date;
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
        accessorFn: (row) => new Date(row.date),
        header: 'Date',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableColumnFilter: false,
        size: 80,
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
        Edit: ({ column, row, table, cell }) => {
          const {
            getState,
            setEditingRow,
            setCreatingRow,
          } = table;
          const date = cell.getValue()?.toLocaleDateString();
          const { creatingRow, editingRow } = getState();
          const isCreating = creatingRow?.id === row.id;
          const isEditing = editingRow?.id === row.id;
          
            const saveInputValueToRowCache = (newValue) => {
            // console.log(newValue);
            row._valuesCache[column.id] = newValue.$d;
            if (isCreating) {
              setCreatingRow({ ...row });
            } else if (isEditing) {
              setEditingRow({ ...row });
            }
          };
            return (
                 <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={(newValue) => {
                            saveInputValueToRowCache(newValue);
                            }}
                          defaultValue={dayjs(date)}
                        />
                     </LocalizationProvider>
                   </FormControl>
                 </Box>
            )
        },

      },
      {
        accessorKey: 'payee',
        header: 'Payee',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'paid',
        header: 'Paid Status',
        Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({

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
                  ? '#528638'
                  : '#cc0000',
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
             {categories.map((cat,i) => (
                 <MenuItem key={i} value={cat.id}>{cat.category}</MenuItem>
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
         <> 
            {accLevel !==0?
                <>
                <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Create New Item
              </Button>

             <ImportRegCSV week_id={weekID} client_id={clientID}/>
             {weekData && <ExportCSV weekData={weekData} categories={categories}/> }
                </> : <></>}
        </>
        )}
      />
      <CreateNewItemModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        categories={categories}
        weekID={weekID}
        clientID={clientID}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewItemModal = ({ open, columns, onClose, onSubmit, categories, clientID, weekID }) => {
    
    const [item, setItem] = useState({
                                    date:'',
                                    payee: String,
                                    category_id: 0,
                                    amount: "$0.00",
                                    paid: false,
                                    week_id: weekID,
                                    client_id: clientID,
                                        });
    
    function handleChange(type, change) {
        console.log('inhandleChange', type, change);
        switch(type) {
            case "date":
                setItem({...item, date: change});
                break
            case "payee":
                setItem({...item, payee: change});
                break
            case "cat":
                setItem({...item, category_id: change});
                break
            case "amount":
                setItem({...item, amount: change}); 
                break
            case "paid":
                setItem({...item, paid: change});
                break
        }
    }

    const handleSubmit = () => {
        onSubmit(item);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Item</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                        width: '100%',
                        minWidth: { xs: '300px', sm: '360px', md: '400px' },
                        gap: '1.5rem',
                        }}
                    >
                        <InputLabel htmlFor="TextFieldOne">Date</InputLabel>
                        <TextField
                            name="TextFieldOne"
                            type="date"
                            value={item.date}
                            onChange={(e)=>handleChange("date", e.target.value)}
                            required
                        />

                        <InputLabel htmlFor="TextFieldTwo">Payee</InputLabel>
                        <TextField
                            name="TextFieldTwo"
                            type="text"
                            value={item.payee}
                            onChange={(e)=>handleChange("payee", e.target.value)}
                            required
                        />



                        <InputLabel htmlFor="TextFieldFour">Amount</InputLabel>
                        <TextField
                            name="TextFieldFour"
                            type="text"
                            value={item.amount}
                            onChange={(e)=>handleChange("amount", e.target.value)}
                            required
                        />
                
                        <InputLabel htmlFor="TextFieldFive">Paid?</InputLabel>
                        <Checkbox
                            name="TextFieldFive"
                            value={item.paid}
                            checked={item.paid}
                            onChange={(e)=>handleChange("paid", e.target.checked)}
                        />
                         <InputLabel htmlFor="TextFieldThree-select">Category</InputLabel>
                        <select 
                            htmlFor="TextFieldThree"
                            onChange={(e)=>handleChange("cat", e.target.value)}
                            required
                        >
                            {categories.map((cat, i) => (
                                <option value={cat.id} key={i} >{cat.category} </option>
                            ))}
                        </select>                        
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Item
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Example;

