import { useSelector, useDispatch } from "react-redux";


function RecentPLTable() {

    const recentPL = useSelector(store => store.recentPL);


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Most Recent Week</th>
                    </tr>
                    <tr>
                        <th>Income</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {recentPL.map(transaction => {
                        if (transaction.category_id === 1 && transaction.paid === true) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" checked readOnly /></td>
                            </tr>
                        } else if (transaction.category_id === 1 && transaction.paid === false) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" disabled /></td>
                            </tr>
                        }
                    })}
                </tbody>
                <tbody>
                    
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Most Recent Week</th>
                    </tr>
                    <tr>
                        <th>Expenses</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {recentPL.map(transaction => {
                        if (transaction.category_id === 2 && transaction.paid === true) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" checked readOnly /></td>
                            </tr>
                        } else if (transaction.category_id === 2 && transaction.paid === false) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" disabled /></td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default RecentPLTable;