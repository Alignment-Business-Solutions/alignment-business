import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableCell,  } from "@mui/material";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function TableItem({item, accLevel, categories, tableType, weekID, clientID}) { 
    
    const [editToggleValue, setEditToggleValue] = useState(false);
    const [addToggleValue, setAddToggleValue] = useState(false);
    const [itemEd, setItemEd] = useState(item);
    const dispatch = useDispatch();
    const [cat, setCat] = useState(''); 
    const dbData = useSelector(store => store.singlePL);
    const [match, setMatch] = useState(false);
    function editToggle() {
        if(editToggleValue) {
            console.log('save');
            console.log(itemEd);
            dispatch({type:"UPDATE_ITEM", payload:{data: itemEd,
                                                   week: weekID,
                                                   client: clientID}});
            setEditToggleValue(!editToggleValue); 
        } else {
            console.log('edit');
            setEditToggleValue(!editToggleValue);
        }
    }

    function editToggleTwo() {
        if(editToggleValue) {
            console.log('save');
            console.log(itemEd);
            setEditToggleValue(!editToggleValue); 
        } else {
            console.log('edit');
            setEditToggleValue(!editToggleValue);
        }
    }

    //figure out why delete isn't working consecutively
    function deleteItem() {
        dispatch({type:"DELETE_ITEM", payload: {data: itemEd.id,
                                                week: weekID,
                                                client: clientID}});
    }
    
    function addItem() {
        if (itemEd.payee === "") {
            alert('Add Payee');
            return;
        } else {
            dispatch({type:"POST_ITEM", payload: itemEd});
            setAddToggleValue(true);
        }
    }

    function handleChange(type, change) {
        console.log('inhandleChange', type, change);
        switch(type) {
            case "date":
                setItemEd({...itemEd, date: change});
                break
            case "payee":
                setItemEd({...itemEd, payee: change});
                break
            case "cat":
                setItemEd({...itemEd, category_id: change});
                break
            case "amount":
                setItemEd({...itemEd, amount: change}); 
                break
            case "paid":
                setItemEd({...itemEd, paid: change});
                break
        }
    }

    function findCatName() {
        for (let cat of categories) {
            if ( cat.id === itemEd.category_id) {
                setCat(cat.category);
            }
        }
    }
    function matchChecker() {
        if(tableType === 2){
            // setItemEd({...itemEd, amount: `${itemEd.amount}`}); 
            for (let dbItem of dbData) {
                if (dbItem.amount === itemEd.amount && 
                    dbItem.payee === itemEd.payee && 
                    dbItem.date === itemEd.date &&
                    dbItem.category_id === itemEd.category_id) {
                     console.log('MATCH');
                     setMatch(true);
                 }
            }
        }
    }
    function onLoad() {
        let date = item.date
        date = date.slice(0, 10);
        setItemEd({...itemEd, date: date});
        findCatName();
        matchChecker();
    }

    useEffect(() => {
        onLoad();
    }, []);

    if (tableType === 1) {
    return (
        (editToggleValue) ? (
        <>
        <TableRow key={itemEd.id}>
            <TableCell>
                <TextField
                    type="date"
                    value={itemEd.date}
                    onChange={(e)=>handleChange("date", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.payee}
                    onChange={(e)=>handleChange("payee", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Select onChange={(e)=>handleChange("cat", e.target.value)}>
                    <MenuItem value={itemEd.category_id}>{cat}</MenuItem>
                    {categories && categories.map((cat, i) => (
                        <MenuItem key={i} value={cat.id}>{cat.category}</MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.amount}
                    onChange={(e)=>handleChange("amount", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    value={itemEd.paid}
                    checked={itemEd.paid}
                    onChange={(e)=>handleChange("paid", e.target.checked)}
                />
                
            </TableCell>
                {accLevel !== 0 ? (
                <>
                    <TableCell><Button onClick={editToggle}>Save</Button></TableCell>
                    <TableCell><Button onClick={deleteItem}>Remove</Button></TableCell>
                </>
                ) : (<></>)}
            </TableRow> 
            </>
        ) : (
        <>
        <TableRow key={itemEd.id}>
            <TableCell>
                <TextField
                    type="date"
                    value={itemEd.date}
                    readOnly
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.payee}
                    readOnly
                />
            </TableCell>
            <TableCell>{cat}</TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.amount}
                    readOnly
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    value={itemEd.paid}
                    checked={itemEd.paid}
                    readOnly
                />
                
            </TableCell>
            {accLevel !== 0 ? (
            <>
                <TableCell><Button onClick={editToggle}>Edit</Button></TableCell>
                <TableCell><Button onClick={deleteItem}>Remove</Button></TableCell>
            </>
            ) : (<></>)}
        </TableRow>
            </>
        )
    );
    } 
    // refacter into separate compnents
    else {
    return (
        (editToggleValue) ? (
        <>
        <TableRow key={itemEd.id}>
            <TableCell>
                <TextField
                    type="date"
                    value={itemEd.date}
                    onChange={(e)=>handleChange("date", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.payee}
                    onChange={(e)=>handleChange("payee", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Select onChange={(e)=>handleChange("cat", e.target.value)}>
                    <MenuItem value={itemEd.category_id}>{cat}</MenuItem>
                    {categories && categories.map((cat, i) => (
                        <MenuItem key={i} value={cat.id}>{cat.category}</MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.amount}
                    onChange={(e)=>handleChange("amount", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    value={itemEd.paid}
                    checked={itemEd.paid}
                    onChange={(e)=>handleChange("paid", e.target.checked)}
                />
                
            </TableCell>
                {accLevel !== 0 ? (
                <>
                    <TableCell><Button onClick={editToggleTwo}>Save</Button></TableCell>
                </>
                ) : (<></>)}
            </TableRow> 
            </>
        ) : (
        <>
        <TableRow key={itemEd.id}>
            <TableCell>
                <TextField
                    type="date"
                    value={itemEd.date}
                    readOnly
                />
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.payee}
                    readOnly
                />
            </TableCell>
            <TableCell>{cat}</TableCell>
            <TableCell>
                <TextField
                    type="text"
                    value={itemEd.amount}
                    readOnly
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    value={itemEd.paid}
                    checked={itemEd.paid}
                    readOnly
                />
                
            </TableCell>
            {accLevel !== 0 && match === false && addToggleValue === false ? (
            <>
                <TableCell><Button onClick={editToggleTwo}>Edit</Button></TableCell>
                <TableCell><Button onClick={addItem}>Add</Button></TableCell>
            </>
            ) : (<></>)}
            {match ? <TableCell>MATCH!!!!!!!</TableCell> : <></>}
        </TableRow>
            </>
        )
    );
}
}
export default TableItem;
