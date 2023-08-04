import { useDispatch } from "react-redux";
import React, { useCallback, useState } from 'react';
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Card from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

function BalanceItem({balance, StyledTableCell, StyledTableRow}) {
console.log('Is this working?')
console.log('Balance!', balance)



const updatedBalance = {
    start_date: balance.start_date || '',
    beginning_cash: balance.beginning_cash || '',
    income_received: balance.income_received || '',
    expenses_paid: balance.expenses_paid || '',
    expenses_expected: balance.expenses_expected || '',
    to_from_savings: balance.to_from_savings || '',
    saving_balance: balance.saving_balance || '',
    outstanding_checks: balance.outstanding_checks || '',
    loan_to_from: balance.loan_to_from || '',
    id:balance.id,
    // ending_balance_cleared: '',
    // ending_balance_actual: '',
    client_id: balance.client_id
  };
  
  const [upBalance, setUpBalance] = useState(updatedBalance)



const dispatch = useDispatch()
const [edit, setEdit] = useState(false)

const handleBEdit = (event) => {
    event.preventDefault()
    console.log('Edit!', upBalance)

    // const filteredUpBalance = Object.fromEntries(
    //     Object.entries(upBalance).filter(([key, value]) => value !== '')
    //   );
    dispatch({
        type: 'EDIT_BALANCE',
        payload: upBalance
    })

    setEdit(false)
 
}
const startDate = balance.start_date ? new Date(balance.start_date).toLocaleDateString() : '';


const handleBDelete = useCallback((id, client_id) => {
    console.log('Delete!', id, client_id);
    dispatch({
      type: 'DELETE_BALANCE',
      payload: { id: id, client_id: client_id },
});



})
    return (
        <>
        <StyledTableRow>
        {!edit ? (
            
           <>
          <StyledTableCell> {startDate}</StyledTableCell>
        <StyledTableCell>{balance.beginning_cash}</StyledTableCell>
        <StyledTableCell>{balance.income_received}</StyledTableCell>
        <StyledTableCell>{balance.income_received}</StyledTableCell>
        <StyledTableCell>{balance.expenses_paid}</StyledTableCell>
        <StyledTableCell>{balance.expenses_expected}</StyledTableCell>
        <StyledTableCell>{balance.to_from_savings}</StyledTableCell>
        <StyledTableCell>{balance.saving_balance}</StyledTableCell>
        <StyledTableCell>{balance.outstanding_checks}</StyledTableCell>
        <StyledTableCell>{balance.loan_to_from}</StyledTableCell>
        <StyledTableCell>{balance.ending_balance_cleared}</StyledTableCell>
        <StyledTableCell>{balance.ending_balance_actual}</StyledTableCell>
      <TableCell> <Button onClick={() => setEdit(true)}>Edit</Button> </TableCell>
       </> ) : 
         
          ( <StyledTableCell>
       <FormControl>
       <TextField
  label="New Week"
  type="date"
  placeholder="Start Date"
  margin="normal"
  value={upBalance.start_date || balance.start_date}
  onChange={(e) =>
    setUpBalance({ ...upBalance, start_date: e.target.value })
  }
/>

<TextField
  label="Beginning Cash"
  type="text"
  placeholder="Beginning Cash"
  margin="normal"
  value={upBalance.beginning_cash || balance.beginning_cash}
  onChange={(e) =>
    setUpBalance({ ...upBalance, beginning_cash: e.target.value })
  }
/>

<TextField
  label="Income Received"
  type="text"
  placeholder="Income Received"
  margin="normal"
  value={upBalance.income_received || balance.income_received}
  onChange={(e) =>
    setUpBalance({ ...upBalance, income_received: e.target.value })
  }
/>

<TextField
  label="To/(From) Savings"
  type="text"
  placeholder="To/(From) Savings"
  margin="normal"
  value={upBalance.to_from_savings || balance.to_from_savings}
  onChange={(e) =>
    setUpBalance({ ...upBalance, to_from_savings: e.target.value })
  }
/>

<TextField
  label="Saving Balance"
  type="text"
  placeholder="Saving Balance"
  margin="normal"
  value={upBalance.saving_balance || balance.saving_balance}
  onChange={(e) =>
    setUpBalance({ ...upBalance, saving_balance: e.target.value })
  }
/>

<TextField
  label="Outstanding Checks"
  type="text"
  placeholder="Outstanding Checks"
  margin="normal"
  value={upBalance.outstanding_checks || balance.outstanding_checks}
  onChange={(e) =>
    setUpBalance({ ...upBalance, outstanding_checks: e.target.value })
  }
/>

<TextField
  label="Loan (To)/From"
  type="text"
  placeholder="Loan (To)/From"
  margin="normal"
  value={upBalance.loan_to_from || balance.loan_to_from}
  onChange={(e) =>
    setUpBalance({ ...upBalance, loan_to_from: e.target.value })
  }
/>

  <Button onClick={handleBEdit}>Save</Button>
 <StyledTableCell> <Button onClick={() => setEdit(false)}>Back</Button></StyledTableCell>
</FormControl>
           </StyledTableCell>
           )}
        </StyledTableRow>
   <StyledTableCell>
     <Button onClick={() => handleBDelete(balance.id, balance.client_id)}> Delete</Button> </StyledTableCell>
  
    
    </>)
  
 
}

export default BalanceItem