import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import { TextField, Checkbox} from "@mui/material";
import { Button } from "@mui/material";


function ItemForm({categories, weekID, clientID}) {
    
    const [item, setItem] = useState({
                                    date:'',
                                    payee: String,
                                    category_id: 0,
                                    amount: "$0.00",
                                    paid: false,
                                    week_id: weekID,
                                    client_id: clientID,
                                        });
    const [cat, setCat] = useState('');
    const dispatch = useDispatch();
    
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

    function handleSubmit(event) {
        event.preventDefault(); 
        dispatch({type:"POST_ITEM", payload: item});
        setItem({
                date:'',
                payee: String,
                category_id: 0,
                amount: "$0.00",
                paid: false,
                week_id: weekID,
                client_id: clientID,
                });
    }

    function findCatName() {
        for (let cat of categories) {
            if ( cat.id === item.category_id) {
                setCat(cat.category);
            }
        }
    }

    useEffect(() => {
        findCatName();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="formCreate">
                <legend>Add Transaction</legend>

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

                <InputLabel htmlFor="TextFieldThree-select">Category</InputLabel>
                <select 
                    htmlFor="TextFieldThree"
                    onChange={(e)=>handleChange("cat", e.target.value)}
                    required
                >
                    <option value={item.category}>{cat}</option>
                    {categories.map((cat, i) => (
                        <option value={cat.id} key={i} >{cat.category} </option>
                    ))}
                </select>

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

                <Button type="submit">Add</Button>

            </fieldset>
        </form>
    );
}

export default ItemForm;




