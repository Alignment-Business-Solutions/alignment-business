import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ExportCSV from "../../SinglePL/ExportCSV/ExportCSV";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Checkbox } from "@mui/material";


function AllPL_Table({ week, categories }) {

    const client_id = useParams();
    const history = useHistory();

    const length = week.length;

    function gotToWeek(week, client_id) {
        console.log(week, client_id);
        history.push(`/singlePL/${client_id}/${week[0].week_id}`);
    }

    return (

        // {length > 0 ? () : ()}
        <div>
        {length > 0 ? (
            <TableContainer>
            <Table sx={{border: 1, width: "16.67%"}}>
                <TableHead sx={{ textAlign: "center" }}>
                    <TableRow>
                        <TableCell>Week of {week.start_date}</TableCell>
                    </TableRow>
                    <TableRow sx={{ textAlign: "center" }}>
                        <TableCell sx={{ textAlign: "center" }}>Income</TableCell>
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
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><Checkbox checked readOnly /></TableCell>
                            </TableRow>
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
                <TableBody>
                    <TableRow>
                        <TableCell>Expenses</TableCell>
                    </TableRow>
                    {week.map(transaction => {
                        if (transaction.category_id === 2 && transaction.paid === true) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><Checkbox checked readOnly /></TableCell>
                            </TableRow>
                        } else if (transaction.category_id === 2 && transaction.paid === false) {
                            return <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.payee}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell><Checkbox disabled /></TableCell>
                            </TableRow>
                        }
                    })}
                </TableBody>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            <Button
                                variant="contained"
                                onClick={() => gotToWeek(week, client_id.client_id)}
                            >
                                Click To Edit This Week!
                            </Button>
                            {week && <ExportCSV weekData={week} categories={categories} />}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        ) : (
            <>
            </>
        )}
        
        </div>
    )
}

export default AllPL_Table;