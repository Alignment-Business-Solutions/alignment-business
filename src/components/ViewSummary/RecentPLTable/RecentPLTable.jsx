import { useSelector, useDispatch } from "react-redux";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";



function RecentPLTable() {

    // sourcing recentPL reducer from store, setting equal to variable recentPL
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
                    {/* using map to loop through recentPL variable */}
                    {recentPL.map(transaction => {
                        // for each transaction, if category id is equal to 1 (income) and paid is set to true
                        // return this code
                        if (transaction.category_id === 1 && transaction.paid === true) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" checked={transaction.paid} readOnly /></td>
                            </tr>
                            // otherwise if category is income, but paid is set to false, render this code
                        } else if (transaction.category_id === 1 && transaction.paid === false) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" readOnly /></td>
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
                    {/* using map to loop through recentPL variable */}
                    {recentPL.map(transaction => {
                        // for each transaction, if category id is equal to 2 (expense) and paid is set to true
                        // return this code
                        if (transaction.category_id === 2 && transaction.paid === true) {
                            return <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.payee}</td>
                                <td>{transaction.amount}</td>
                                <td><input type="checkbox" checked={transaction.paid} readOnly /></td>
                            </tr>
                            // otherwise if category is expense, but paid is set to false, render this code
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
            <TableContainer>
                <Table aria-label="recent-PL">
                    <TableHead>
                        <TableRow align="center">
                            <TableCell>Most Recent Week</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                            align="center"
                            >Income</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Payee</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Paid?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {recentPL.map(transaction => {
                        // for each transaction, if category id is equal to 2 (expense) and paid is set to true
                        // return this code
                        if (transaction.category_id === 1 && transaction.paid === true) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><input type="checkbox" checked={transaction.paid} readOnly /></TableCell>
                            </TableRow>
                            // otherwise if category is expense, but paid is set to false, render this code
                        } else if (transaction.category_id === 1 && transaction.paid === false) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><input type="checkbox" disabled /></TableCell>
                            </TableRow>
                        }
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer>
                <Table aria-label="recent-PL">
                    <TableHead>
                        <TableRow>
                        </TableRow>
                        <TableRow>
                            <TableCell>Expenses</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Payee</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Paid?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {recentPL.map(transaction => {
                        // for each transaction, if category id is equal to 2 (expense) and paid is set to true
                        // return this code
                        if (transaction.category_id === 2 && transaction.paid === true) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><input type="checkbox" checked={transaction.paid} readOnly /></TableCell>
                            </TableRow>
                            // otherwise if category is expense, but paid is set to false, render this code
                        } else if (transaction.category_id === 2 && transaction.paid === false) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><input type="checkbox" disabled /></TableCell>
                            </TableRow>
                        }
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default RecentPLTable;