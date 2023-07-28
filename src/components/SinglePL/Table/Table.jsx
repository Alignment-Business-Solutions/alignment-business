import TableItem from "./TableItem/TableItem";


function Table({weekData, accLevel, categories, tableType, clientID, weekID}) {



    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Payee</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Paid?</th>
                    {accLevel !== 0 ? (
                    <>
                        <th>Edit</th>
                        <th>Remove</th>
                    </>
                    ) : (<></>)}
                </tr> 
            </thead>
            <tbody> 
                <tr>
                    <td>Income</td>
                    <td>Income</td>
                    <td>Income</td>
                    <td>Income</td>
                    <td>Income</td>
                     {accLevel !== 0 ? (
                        <>
                            <td>Income</td>
                            <td>Income</td>
                        </>
                     ) : (<></>)}
                </tr>
                {weekData.map(item => (
                    (item.category_id === 1) ? (
                    <TableItem item={item} accLevel={accLevel} categories={categories} tableType={tableType} clientID={clientID} weekID={weekID}/>
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
                      {accLevel !== 0 ? (
                        <>
                            <td>Expense</td>
                            <td>Expense</td>
                        </>
                     ) : (<></>)}
                </tr>

                {weekData.map(item => (
                    (item.category_id !== 1) ? (
                    <TableItem item={item} accLevel={accLevel} categories={categories} tableType={tableType} clientID={clientID} weekID={weekID}/>
                    ) : (
                        <></>
                    )
                ))}
            </tbody>
        </table>
        );



}

export default Table;
