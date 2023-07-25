import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


function ItemForm({categories}) {
    
    const [item, setItem] = useState({
                                    date:'',
                                    payee: String,
                                    category_id: 0,
                                    amount: "$0.00",
                                    paid: false
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

    function handleSubmit() {
        dispatch({});



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
            <fieldset>
                <legend>Add Transaction</legend>

                <lable htmlFor="inputOne">Date</lable>
                <input 
                    name="inputOne"
                    type="date"
                    value={item.date}
                    onChange={(e)=>handleChange("date", e.target.value)}
                    required
                />

                <lable htmlFor="inputTwo">Payee</lable>
                <input
                    name="inputTwo"
                    type="text"
                    value={item.payee}
                    onChange={(e)=>handleChange("payee", e.target.value)}
                    required
                />

                <lable htmlFor="inputThree-select">Category</lable>
                <select 
                    htmlFor="inputThree"
                    onChange={(e)=>handleChange("cat", e.target.value)}
                    required
                >
                    <option value={item.category}>{cat}</option>
                    {categories.map((cat, i) => (
                        <option value={cat.id} key={i} >{cat.category} </option>
                    ))}
                </select>

                <lable htmlFor="inputFour">Amount</lable>
                <input
                    name="inputFour"
                    type="text"
                    value={item.amount}
                    onChange={(e)=>handleChange("amount", e.target.value)}
                    required
                />
        
                <lable htmlFor="inputFive">Paid?</lable>
                <input
                    name="inputFive"
                    type="checkbox"
                    value={item.paid}
                    checked={item.paid}
                    onChange={(e)=>handleChange("paid", e.target.checked)}
                />

                <button type="submit">Add</button>

            </fieldset>
        </form>
    );
}

export default ItemForm;




