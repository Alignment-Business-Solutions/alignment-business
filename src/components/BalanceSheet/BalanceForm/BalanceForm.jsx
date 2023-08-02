import { useDispatch } from "react-redux"
import {useState} from 'react'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Button, TextField } from "@mui/material"

function BalanceForm() {

    const dispatch = useDispatch()
    const params = useParams()
    // let client_id = params.client_id
    // console.log(client_id)
    const [edit, setEdit] = useState(false)

    const totalBalance = {
        start_date: '',
        beginning_cash: '',
        income_received: '',
        expenses_paid: '',
        expenses_expected: '',
        to_from_savings: '',
        saving_balance: '',
        outstanding_checks: '',
        loan_to_from: '',
      //   ending_balance_cleared: '',
      //   ending_balance_actual: '',
        client_id: params.client_id,

    }

    let [balance, setBalance] = useState(totalBalance)

    const handleCreateBalance = (event) => {
        event.preventDefault()
        console.log('Created a New Balance')
        dispatch({
            type: 'ADD_BALANCE',
            payload: {balance}
        })

       
   setEdit(false)
        
    }

    return (
        <form>
         {!edit ? (
            <Button onClick={() => setEdit(true)}>New Balance</Button>
         ) : (
            <>

 <TextField
  type="date"
  placeholder="Start Date"
  value={balance.start_date}
  onChange={(e) => setBalance({
    ...balance,
    start_date: e.target.value
  })}
/>

<TextField
  label="Beginning Cash"
  type="text"
  placeholder="Beginning Cash"
  value={balance.beginning_cash}
  onChange={(e) => setBalance({
    ...balance,
    beginning_cash: e.target.value
  })}
/>

<TextField
  label="Income Received"
  type="text"
  placeholder="Income Received"
  value={balance.income_received}
  onChange={(e) => setBalance({
    ...balance,
    income_received: e.target.value
  })}
/>

<TextField
  label="Expenses Paid"
  type="text"
  placeholder="Expenses Paid"
  value={balance.expenses_paid}
  onChange={(e) => setBalance({
    ...balance,
    expenses_paid: e.target.value
  })}
/>

<TextField
  label="Expenses Expected"
  type="text"
  placeholder="Expenses Expected"
  value={balance.expenses_expected}
  onChange={(e) => setBalance({
    ...balance,
    expenses_expected: e.target.value
  })}
/>

<TextField
  label="To/(From) Savings"
  type="text"
  placeholder="To/(From) Savings"
  value={balance.to_from_savings}
  onChange={(e) => setBalance({
    ...balance,
    to_from_savings: e.target.value
  })}
/>

<TextField
  label="Saving Balance"
  type="text"
  placeholder="Saving Balance"
  value={balance.saving_balance}
  onChange={(e) => setBalance({
    ...balance,
    saving_balance: e.target.value
  })}
/>

<TextField
  label="Outstanding Checks"
  type="text"
  placeholder="Outstanding Checks"
  value={balance.outstanding_checks}
  onChange={(e) => setBalance({
    ...balance,
    outstanding_checks: e.target.value
  })}
/>

<TextField
  label="Loan (To)/From"
  type="text"
  placeholder="Loan (To)/From"
  value={balance.loan_to_from}
  onChange={(e) => setBalance({
    ...balance,
    loan_to_from: e.target.value
  })}
/>
              <Button variant="contained" onClick={handleCreateBalance}>Submit</Button>
              </>)}
        </form>
    )
}
     
export default BalanceForm