

import TableItem from "./TableItem/TableItem";


function Table({weekData, accLevel, categories}) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Payee</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Paid?</th>
                </tr> 
            </thead>
            <tbody> 
                <tr>
                    <td>Income</td>
                    <td>Income</td>
                    <td>Income</td>
                    <td>Income</td>
                    <td>Income</td>
                </tr>
                {weekData.map(item => (
                    (item.category_id === 1) ? (
                    <TableItem item={item} accLevel={accLevel} categories={categories}/>
                    ) : (
                        <></>
                    )
                ))}
                <tr>
                    <td>Expense</td>
                    <td>Expense</td>
                    <td>Expense</td>
                    <td>Expense</td>
                    <td>Expense</td>
                </tr>

                {weekData.map(item => (
                    (item.category_id !== 1) ? (
                    <TableItem item={item} accLevel={accLevel} categories={categories}/>
                    ) : (
                        <></>
                    )
                ))}
            </tbody>
        </table>
        );



}

export default Table;
