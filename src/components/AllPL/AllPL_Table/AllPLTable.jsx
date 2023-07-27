

function AllPL_Table({ week }) {
    <table>
        <thead>
            <tr>
                <th>Week of "Insert Week Here"</th>
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
            {week.map(transaction => {
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
            <tr>
                <td>Expenses</td>
            </tr>
            <tr>
                <td>Date</td>
                <td>Payee</td>
                <td>Amount</td>
                <td>Paid</td>
            </tr>
            {week.map(transaction => {
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
        <tbody>
            <tr>
                <td>
                    <button>Click To Edit This Week!</button>
                </td>
            </tr>
        </tbody>
    </table>
}

export default AllPL_Table;