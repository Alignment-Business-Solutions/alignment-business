import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function TableItem({item, accLevel}) { 
    const [editToggleValue, setEditToggleValue] = useState(false);
    const [itemEd, setItemEd] = useState(item);
    const dispatch = useDispatch();
    
    function editToggle() {
        if(editToggleValue) {
            console.log('save');
            console.log(itemEd);
            dispatch({type:"UPDATE_ITEM", payload:{data: itemEd,
                                                   week: 1,
                                                   client: 1}});
            setEditToggleValue(!editToggleValue); 
        } else {
            console.log('edit');
            setEditToggleValue(!editToggleValue);
        }
    }
    function deleteItem() {
        dispatch({type:"DELETE_ITEM", payload: {data: itemEd.id,
                                                week: 1,
                                                client: 1}});

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
            case "category":
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

    useEffect(() => {
        let date = item.date
        date = date.slice(0, 10);
        setItemEd({...itemEd, date: date});
    }, []);

    return (
        (editToggleValue) ? (
        <>
        <tr key={item.id}>
            <td>
                <input
                    type="date"
                    value={itemEd.date}
                    onChange={(e)=>handleChange("date", e.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={itemEd.payee}
                    onChange={(e)=>handleChange("payee", e.target.value)}
                />
            </td>
            <td>{itemEd.category_id}</td>
            <td>
                <input
                    type="text"
                    value={itemEd.amount}
                    onChange={(e)=>handleChange("amount", e.target.value)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    value={itemEd.paid}
                    checked={itemEd.paid}
                    onChange={(e)=>handleChange("paid", e.target.checked)}
                />
                
            </td>
                {accLevel !== 0 ? (
                <>
                    <td><button onClick={editToggle}>Save</button></td>
                    <td><button onClick={deleteItem}>Remove</button></td>
                </>
                ) : (<></>)}
            </tr> 
            </>
        ) : (
        <>
        <tr key={itemEd.id}>
            <td>
                <input
                    type="date"
                    value={itemEd.date}
                    readOnly
                />
            </td>
            <td>
                <input
                    type="text"
                    value={itemEd.payee}
                    readOnly
                />
            </td>
            <td>{itemEd.category_id}</td>
            <td>
                <input
                    type="text"
                    value={itemEd.amount}
                    readOnly
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    value={itemEd.paid}
                    checked={itemEd.paid}
                    readOnly
                />
                
            </td>
            {accLevel !== 0 ? (
            <>
                <td><button onClick={editToggle}>Edit</button></td>
                <td><button onClick={deleteItem}>Remove</button></td>
            </>
            ) : (<></>)}
        </tr>
            </>
        )
    );




}

export default TableItem;