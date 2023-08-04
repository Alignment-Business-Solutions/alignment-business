import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ExportCSV from "../../SinglePL/ExportCSV/ExportCSV";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Checkbox, Box } from "@mui/material";
import { useEffect } from "react";


function AllPL_Table({ week, categories }) {

    const client_id = useParams();
    const history = useHistory();

    const length = week.length;

    function gotToWeek(week, client_id) {
        console.log(week, client_id);
        history.push(`/singlePL/${client_id}/${week[0].week_id}`);
    }

    console.log('week is:', week);

    return (

        <div>
            {length > 0 ? (
                <Box align="center">
                    <TableContainer sx={{ height: 550, overflow: "auto" }}>
                        <Table sx={{ border: 1 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }} colSpan={4}>Week of {week[0].start_date.slice(0, 10)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }} colSpan={4}>Income</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Payee</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Paid</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {week.map(transaction => {
                                    if (transaction.category_id === 1 && transaction.paid === true) {
                                        return <TableRow key={transaction.id}>
                                            <TableCell>{transaction.date.slice(0, 10)}</TableCell>
                                            <TableCell>{transaction.payee}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell><Checkbox checked readOnly /></TableCell>
                                        </TableRow>
                                    } else if (transaction.category_id === 1 && transaction.paid === false) {
                                        return <TableRow key={transaction.id}>
                                            <TableCell>{transaction.date.slice(0, 10)}</TableCell>
                                            <TableCell>{transaction.payee}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell><Checkbox disabled /></TableCell>
                                        </TableRow>
                                    }
                                })}
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }} colSpan={4}>Expenses</TableCell>
                                </TableRow>
                                {week.map(transaction => {
                                    if (transaction.category_id === 2 && transaction.paid === true) {
                                        return <TableRow key={transaction.id}>
                                            <TableCell>{transaction.date.slice(0, 10)}</TableCell>
                                            <TableCell>{transaction.payee}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell><Checkbox checked readOnly /></TableCell>
                                        </TableRow>
                                    } else if (transaction.category_id === 2 && transaction.paid === false) {
                                        return <TableRow key={transaction.id}>
                                            <TableCell>{transaction.date.slice(0, 10)}</TableCell>
                                            <TableCell>{transaction.payee}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell><Checkbox disabled /></TableCell>
                                        </TableRow>
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                    <Button
                        variant="contained"
                        onClick={() => gotToWeek(week, client_id.client_id)}
                    >
                        Edit This Week!
                    </Button>
                    {week && <ExportCSV weekData={week} categories={categories} />}
                </Box>
            ) : (
                <>
                </>
            )}

        </div>
    )
}

export default AllPL_Table;