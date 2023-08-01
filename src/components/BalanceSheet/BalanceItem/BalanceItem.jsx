import { useDispatch } from "react-redux";
import React, { useCallback } from 'react';

function BalanceItem({balance}) {
console.log('Is this working?')
console.log('Balance!', balance)
const dispatch = useDispatch()

const handleBEdit = () => {
    console.log('Edit!')
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
        <tr>
        <td>{balance.start_date}</td>
        <td>{balance.beginning_cash}</td>
        <td>{balance.income_received}</td>
        <td>{balance.income_received}</td>
        <td>{balance.expenses_paid}</td>
        <td>{balance.expenses_expected}</td>
        <td>{balance.to_from_savings}</td>
        <td>{balance.saving_balance}</td>
        <td>{balance.outstanding_checks}</td>
        <td>{balance.loan_to_from}</td>
        <td>{balance.ending_balance_cleared}</td>
        <td>{balance.ending_balance_actual}</td>
  <td><button onClick={handleBEdit}>🖊️</button></td>
   <td> <button onClick={() => handleBDelete(balance.id, balance.client_id)}> Delete</button> </td>
    </tr>
      
    
    </>)
  
 
}

export default BalanceItem