import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material";



function RecentPLTable() {

    // sourcing recentPL reducer from store, setting equal to variable recentPL
    const recentPL = useSelector(store => store.recentPL);

    return (
        <div>
            <p className="center-text">Most Recent Week Profit and Loss</p>
            <TableContainer>
                <Table aria-label="recent-PL">
                    <TableHead>
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
                                <TableCell><Checkbox checked={transaction.paid} readOnly /></TableCell>
                            </TableRow>
                            // otherwise if category is expense, but paid is set to false, render this code
                        } else if (transaction.category_id === 1 && transaction.paid === false) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><Checkbox disabled /></TableCell>
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
                                <TableCell><Checkbox checked={transaction.paid} readOnly /></TableCell>
                            </TableRow>
                            // otherwise if category is expense, but paid is set to false, render this code
                        } else if (transaction.category_id === 2 && transaction.paid === false) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><Checkbox type="checkbox" disabled /></TableCell>
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