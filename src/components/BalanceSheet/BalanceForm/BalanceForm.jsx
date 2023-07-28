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

    return (
        <form>
             <label>Beginning Cash</label>
                        <input 
                        type='number'
                        placeholder='Beginning Cash'
                        value={balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           beginning_cash: e.target.value
                        })} 
                        />
                         <label>Income Received</label>
                        <input 
                        type='number'
                        placeholder='Income Received'
                        value={balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           income_received: e.target.value
                        })} 
                        />
                          <label>Expenses Paid</label>
                        <input 
                        type='number'
                        placeholder='Expenses Paid'
                        value={balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           expenses_paid: e.target.value
                        })} 
                        />
                            <label>Expenses Expected</label>
                        <input 
                        type='number'
                        placeholder='Expenses Expected'
                        value={balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           expenses_expected: e.target.value
                        })} 
                        />
                            <label>To/(From) Savings</label>
                        <input 
                        type='number'
                        placeholder='To/(From) Savings'
                        value={balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           to_from_savings: e.target.value
                        })} 
                        />
                                <label>To/(From) Savings</label>
                        <input 
                        type='number'
                        placeholder='To/(From) Savings'
                        value={balance}
                        onChange={(e) => setBalance({
                           ...totalBalance,
                           saving_balance: e.target.value
                        })} 
                        />
        </form>
    )
}

export default BalanceForm