



function TableItem({item, categories}) { 


    return (

        <tr>
            <td>{item.date}</td>
            <td>{item.payee}</td>
            <td>{item.category_id}</td>
            <td>{item.amount}</td>
            <td>{JSON.stringify(item.paid)}</td>
        </tr> 

    );




}

export default TableItem;
