



function TableItem({item, accLevel}) { 
    let date = item.date
    date = date.slice(0, 10);
    

    return (

        <tr>
            <td>
                <input
                    type="date"
                    value={date}
                    readOnly
                />
            </td>
            <td>
                <input
                    type="text"
                    value={item.payee}
                    readOnly
                />
            </td>
            <td>{item.category_id}</td>
            <td>
                <input
                    type="text"
                    value={item.amount}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    value={item.paid}
                    checked={item.paid}
                    readOnly
                />
                
            </td>
            {accLevel !== 0 ? (
            <>
                <td><button>Edit</button></td>
                <td><button>Remove</button></td>
            </>
            ) : (<></>)}
        </tr> 

    );




}

export default TableItem;
