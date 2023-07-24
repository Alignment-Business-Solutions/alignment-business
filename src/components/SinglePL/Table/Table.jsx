

import TableItem from "./TableItem/TableItem";


function Table({weekData}) {

    return (
        <table>
            <thead>
                <th>Date</th>
                <th>Payee</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Paid?</th>
            </thead>
            <tbody>
                {weekData.map(item => (
                <TableItem key={item.id} item={item}/>
                ))}
            </tbody>
        </table>
        );



}

export default Table;
