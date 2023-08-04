import React,{useEffect, useReact} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import BalanceItem from './BalanceItem/BalanceItem';
import BalanceForm from './BalanceForm/BalanceForm';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Table, TableHead, TableBody, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';

function BalanceSheet(){

    const dispatch = useDispatch();
    const balanceSheet = useSelector((store) => store.balance);
    const params = useParams()
    console.log('Params for BalanceSheet ===>', params)



    useEffect(() => {
        dispatch({
          type: "FETCH_BALANCE",
          payload: params.client_id
        });
       
      }, []);
      console.log('Balance Sheet', balanceSheet)

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
    
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }));

    return (
       <>
    {/* <BalanceForm /> */}
        
        {/* <table >
  <thead>
    <tr>
      <th>Weeks</th>
      <th >Beginning Cash</th>
      <th >Income (received)</th>
      <th >Expenses (paid)</th>
      <th >Expenses (expected)</th>
      <th >Expenses (expected)</th>
      <th>To/(From) Savings</th>
      <th>Saving Balance</th>
      <th>Outstanding Checks</th>
      <th>Loan (To)/From</th>
      <th>Ending Balance (cleared)</th>
      <th>Ending Balance (actual)</th>
      {/* <th></th>
      <th></th>  </tr>
  </thead>
  <tbody>
   
        {balanceSheet && balanceSheet.map((balance,i) => (

             <BalanceItem key={i} balance={balance}/>
    
        ))}
</tbody>
</table> */}


<BalanceForm />
<Box >
<Table sx={{
  tableLayout: 'fixed',
  width: '100%',
  margin: 'auto'}}>
  <TableHead>
    <TableRow>

      <StyledTableCell>Weeks</StyledTableCell>
      <StyledTableCell>Beginning Cash</StyledTableCell>
      <StyledTableCell>Income (received)</StyledTableCell>
      <StyledTableCell>Expenses (paid)</StyledTableCell>
      <StyledTableCell>Expenses (expected)</StyledTableCell>
      <StyledTableCell>Expenses (expected)</StyledTableCell>
      <StyledTableCell>To/(From) Savings</StyledTableCell>
      <StyledTableCell>Saving Balance</StyledTableCell>
      <StyledTableCell>Outstanding Checks</StyledTableCell>
      <StyledTableCell>Loan (To)/From</StyledTableCell>
      <StyledTableCell>Ending Balance (cleared)</StyledTableCell>
      <StyledTableCell>Ending Balance (actual)</StyledTableCell>
    
    </TableRow>
  </TableHead>
  <TableBody sx={  {whiteSpace: 'wrap',
    textAlign: 'center',
    padding: '8px'}}>
    {balanceSheet && balanceSheet.map((balance, i) => (
      <BalanceItem key={i} balance={balance} StyledTableCell={StyledTableCell} StyledTableRow={StyledTableRow}/>
    ))}
  </TableBody>
</Table>
   
</Box>
</> )
}

export default BalanceSheet