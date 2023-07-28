import { useDispatch } from "react-redux"
import {useState} from 'react'


function BalanceForm() {

    const dispatch = useDispatch()

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
        ending_balance_cleared: '',
        ending_balance_actual: ''
    }

    let [balance, setBalance] = useState(totalBalance)

    // const handleCreateBalance = (event) => {
    //     event.preventDefault()
    //     console.log('Created a New Balance')

    // }

    return (
        <form>
                <label>New Week</label>
                        <input 
                        type='date'
                        placeholder='Start Date'
                        value={balance.start_date}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           start_date: e.target.value
                        })} 
                        />
             <label>Beginning Cash</label>
                        <input 
                        type='text'
                        placeholder='Beginning Cash'
                        value={balance.beginning_cash}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           beginning_cash: e.target.value
                        })} 
                        />
                         <label>Income Received</label>
                        <input 
                        type='text'
                        placeholder='Income Received'
                        value={balance.income_received}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           income_received: e.target.value
                        })} 
                        />
                          <label>Expenses Paid</label>
                        <input 
                        type='text'
                        placeholder='Expenses Paid'
                        value={balance.expenses_paid}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           expenses_paid: e.target.value
                        })} 
                        />
                            <label>Expenses Expected</label>
                        <input 
                        type='text'
                        placeholder='Expenses Expected'
                        value={balance.expenses_expected}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           expenses_expected: e.target.value
                        })} 
                        />
                            <label>To/(From) Savings</label>
                        <input 
                        type='text'
                        placeholder='To/(From) Savings'
                        value={balance.to_from_savings}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           to_from_savings: e.target.value
                        })} 
                        />
                                <label>Saving Balance</label>
                        <input 
                        type='text'
                        placeholder='Saving Balance'
                        value={balance.saving_balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           saving_balance: e.target.value
                        })} 
                        />
                                  <label>Outstanding Checks</label>
                        <input 
                        type='text'
                        placeholder='Outstanding Checks'
                        value={balance.outstanding_checks}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           outstanding_checks: e.target.value
                        })} 
                        />
                                  <label>Loan (To)/From</label>
                        <input 
                        type='text'
                        placeholder='Loan (To)/From'
                        value={balance.loan_to_from}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           loan_to_from: e.target.value
                        })} 
                        />
                                  <label>Ending Balance (cleared)</label>
                        <input 
                        type='text'
                        placeholder='Ending Balance (cleared)'
                        value={balance.ending_balance_cleared}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           ending_balance_cleared: e.target.value
                        })} 
                        />
                                  <label>Ending Balance (actual)</label>
                        <input 
                        type='text'
                        placeholder='Ending Balance (actual)'
                        value={balance.ending_balance_actual}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           ending_balance_actual: e.target.value
                        })} 
                        />
             
        </form>
    )
}

export default BalanceForm