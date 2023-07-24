



function TableItem({item, accLevel}) { 


    return (

        <tr>
            <td>{item.date}</td>
            <td>{item.payee}</td>
            <td>{item.category_id}</td>
            <td>{item.amount}</td>
            <td>
                <input
                    type="checkbox"
                    value={item.paid}
                    checked={item.paid}
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
