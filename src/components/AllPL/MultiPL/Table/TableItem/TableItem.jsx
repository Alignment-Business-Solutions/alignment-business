import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function TableItem({item, accLevel, categories}) { 
    
    const [editToggleValue, setEditToggleValue] = useState(false);
    const [itemEd, setItemEd] = useState(item);
    const dispatch = useDispatch();
    const [cat, setCat] = useState(''); 

    function findCatName() {
        for (let cat of categories) {
            if ( cat.id === itemEd.category_id) {
                setCat(cat.category);
            }
        }
    }

    useEffect(() => {
        let date = item.date
        date = date.slice(0, 10);
        setItemEd({...itemEd, date: date});
        findCatName();
    }, []);

    return (
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
            <td>{cat}</td>
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
        </tr>
    );




}

export default TableItem;
