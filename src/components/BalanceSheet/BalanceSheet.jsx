import React,{useEffect, useReact} from 'react'
import {useDispatch, useSelector} from 'react-redux'

function BalanceSheet(){

    const dispatch = useDispatch();
    const balance = useSelector((store) => store.balance);

    useEffect(() => {
        dispatch({
          type: "FETCH_BALANCE",
        });
      }, []);
    return (
        <>
    
        
        <table id='table'>
  <thead>
    <tr>
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
    </tr>
  </thead>
  <tbody>

</tbody>
</table>
   </> )
}

export default BalanceSheet