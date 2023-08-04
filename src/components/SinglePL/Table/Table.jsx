import TableItem from "./TableItem/TableItem";
import { Table, TableHead, TableContainer, TableBody, TableRow, TableCell} from "@mui/material";


function TableComp({weekData, accLevel, categories, tableType, clientID, weekID}) {



    return (
        <TableContainer sx={{ height: 550, overflow: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><h2>Date</h2></TableCell>
                        <TableCell><h2>Payee</h2></TableCell>
                        <TableCell><h2>Category</h2></TableCell>
                        <TableCell><h2>Amount</h2></TableCell>
                        <TableCell><h2>Paid?</h2></TableCell>
                        {accLevel !== 0 ? (
                        <>
                            <TableCell><h2>Edit</h2></TableCell>
                            <TableCell><h2>Remove</h2></TableCell>
                        </>
                        ) : (<></>)}
                    </TableRow> 
                </TableHead>
                <TableBody> 
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell><h3>Income</h3></TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                         {accLevel !== 0 ? (
                            <>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                            </>
                         ) : (<></>)}
                    </TableRow>
                    {weekData.map(item => (
                        (item.category_id === 1) ? (
                        <TableItem item={item} accLevel={accLevel} categories={categories} tableType={tableType} clientID={clientID} weekID={weekID}/>
                        ) : (
                            <></>
                        )
                    ))}
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell><h3>Expense</h3></TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                          {accLevel !== 0 ? (
                            <>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                            </>
                         ) : (<></>)}
                    </TableRow>

                    {weekData.map(item => (
                        (item.category_id !== 1) ? (
                        <TableItem item={item} accLevel={accLevel} categories={categories} tableType={tableType} clientID={clientID} weekID={weekID}/>
                        ) : (
                            <></>
                        )
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        );



}

export default TableComp;
