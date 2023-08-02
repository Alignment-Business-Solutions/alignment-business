import { useDispatch } from "react-redux";
import React, { useCallback, useState } from 'react';


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
          <StyledTableCell>{balance.start_date}</StyledTableCell>
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
       <button onClick={() => setEdit(true)}>🖊️</button>
       </> ) : 
         
          ( <StyledTableCell>
            <form>
                
             <label>New Week</label>
                        <input 
                        type='date'
                        placeholder='Start Date'
                        value={upBalance.start_date || balance.start_date}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           start_date: e.target.value
                        })} 
                        />
             <label>Beginning Cash</label>
                        <input 
                        type='text'
                        placeholder='Beginning Cash'
                        value={upBalance.beginning_cash || balance.beginning_cash}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           beginning_cash: e.target.value
                        })} 
                        />
                         <label>Income Received</label>
                        <input 
                        type='text'
                        placeholder='Income Received'
                        value={upBalance.income_received || balance.income_received}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           income_received: e.target.value
                        })} 
                        />
                          {/* <label>Expenses Paid</label>
                        <input 
                        type='text'
                        placeholder='Expenses Paid'
                        value={upBalance.expenses_paid || balance.expenses_paid}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           expenses_paid: e.target.value
                        })} 
                        />
                            <label>Expenses Expected</label>
                        <input 
                        type='text'
                        placeholder='Expenses Expected'
                        value={upBalance.expenses_expected || balance.expenses_expected}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           expenses_expected: e.target.value
                        })} 
                        /> */}
                            <label>To/(From) Savings</label>
                        <input 
                        type='text'
                        placeholder='To/(From) Savings'
                        value={upBalance.to_from_savings || balance.to_from_savings}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           to_from_savings: e.target.value
                        })} 
                        />
                                <label>Saving Balance</label>
                        <input 
                        type='text'
                        placeholder='Saving Balance'
                        value={upBalance.saving_balance || balance.saving_balance}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           saving_balance: e.target.value
                        })} 
                        />
                                  <label>Outstanding Checks</label>
                        <input 
                        type='text'
                        placeholder='Outstanding Checks'
                        value={upBalance.outstanding_checks || balance.outstanding_checks}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           outstanding_checks: e.target.value
                        })} 
                        />
                                  <label>Loan (To)/From</label>
                        <input 
                        type='text'
                        placeholder='Loan (To)/From'
                        value={upBalance.loan_to_from || balance.loan_to_from}
                        onChange={(e) => setUpBalance({
                           ...upBalance,
                           loan_to_from: e.target.value
                        })} 
                        />
              <button onClick={handleBEdit}>☑️</button>
              <button onClick={() => setEdit(false)}>Close</button>
           </form>
           </StyledTableCell>
           )}
        </StyledTableRow>
         {/* <td> {!edit ? (
              <button onClick={() => setEdit(true)} >🖊️</button>
     ) : (
      <form>
             <p>Hey</p>
         </form
        <form>
        
       
       </form>
       
        
       
     )}
 </td> */}
   <td>
     <button onClick={() => handleBDelete(balance.id, balance.client_id)}> Delete</button> </td>
  
    
    </>)
  
 
}

export default BalanceItem