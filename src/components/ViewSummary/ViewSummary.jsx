import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react";


function ViewSummary() {

    const dispatch = useDispatch();
    const history = useHistory();

    const recentPL = useSelector(store => store.recentPL);
    const weeksDropdown = useSelector(store => store.weeksDropdown)
    const [addClicker, setAddClicker] = useState(false);
    const [start_date, setStartDate] = useState('')
    const [weekSelected, setWeekSelected] = useState(0)

    function pageLoad(recentPL) {
        dispatch({ type: 'FETCH_RECENT_PL' })
        dispatch({ type: 'FETCH_WEEKS_DROPDOWN'})
    }

    function submitNewWeek(event) {
        event.preventDefault();
        let newWeek = {
            start_date
        };
        console.log('newWeek being submitted is:', newWeek);
        dispatch({ type: 'SUBMIT_NEW_WEEK', payload: newWeek });
        setAddClicker(false);
    }

    function goToWeek(event) {
        event.preventDefault();
        dispatch({ type: 'FETCH_WEEK'})
    }

    useEffect(() => {
        pageLoad();
    }, [])

    return (
        <div>
            {
                addClicker ?
                <form onSubmit={(event) => submitNewWeek(event)}>
                    <label>Starting Date</label>
                    <input
                        placeholder="Example: 12/12/2023"
                        value={start_date}
                        onChange={(event) => setStartDate(event.target.value)}
                        required
                    />
                    <button type="submit">Submit New Week!</button>
                    <button onClick={() => setAddClicker(false)}>Cancel Add Week</button>
                </form>
                 :
                <button onClick={() => setAddClicker(true)}>Create New Week</button>
            }
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Week of 5/1</th>
                        </tr>
                        <tr>
                            <th>Income</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Payee</th>
                            <th>Amount</th>
                            <th>Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                    {recentPL.map(transaction => {
                            if (transaction.category_id === 1 && transaction.paid === true){
                                return <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payee}</td>
                                    <td>{transaction.amount}</td>
                                    <td><input type="checkbox" checked readOnly/></td>
                                </tr>
                            } else if (transaction.category_id === 1 && transaction.paid === false) {
                                return <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payee}</td>
                                    <td>{transaction.amount}</td>
                                    <td><input type="checkbox" disabled/></td>
                                </tr>                                
                            }
                        })}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Week of 5/1</th>
                        </tr>
                        <tr>
                            <th>Expenses</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Payee</th>
                            <th>Amount</th>
                            <th>Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                    {recentPL.map(transaction => {
                            if (transaction.category_id === 2 && transaction.paid === true){
                                return <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payee}</td>
                                    <td>{transaction.amount}</td>
                                    <td><input type="checkbox" checked readOnly/></td>
                                </tr>
                            } else if (transaction.category_id === 2 && transaction.paid === false) {
                                return <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payee}</td>
                                    <td>{transaction.amount}</td>
                                    <td><input type="checkbox" disabled/></td>
                                </tr>                                
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <form onSubmit={(event) => goToWeek(event)}>
                    <select
                        value={weekSelected}
                        onChange={(event) => setWeekSelected(event.target.value)}
                    >
                        <option value=""> -- Click to Select a week!</option>
                        {weeksDropdown.map(week => (
                            <option value={week.id}>{week.start_date}</option>
                        ))}
                    </select>
                    <button type="submit">Go To Week Details</button>
                </form>
            </div>
        </div>
    )
}

export default ViewSummary;