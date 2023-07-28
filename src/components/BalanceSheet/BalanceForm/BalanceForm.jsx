import { useDispatch } from "react-redux"
import {useState} from 'react'

function BalanceForm() {
    return (
        <form>
             <label>Amount Saved</label>
                        <input 
                        type='number'
                        placeholder='beginning_cash'
                        value={balance}
                        // onChange={(e) => setSaved(e.target.value)} 
                        />
        </form>
    )
}

export default BalanceForm