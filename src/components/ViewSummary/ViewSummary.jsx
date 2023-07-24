import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react";


function ViewSummary() {

    const dispatch = useDispatch();
    const history = useHistory();

    const recentPL = useSelector(store => store.recentPL);
    const [addClicker, setAddClicker] = useState(false);
    const [start_date, setStartDate] = useState('')

    function pageLoad(recentPL) {
        dispatch({ type: 'FETCH_RECENT_PL' })
    }

    function newWeekActivate() {
        console.log('Create New Week Button Clicked!');
        setAddClicker(true);
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
                </form>
                 :
                <button onClick={() => newWeekActivate()}>Create New Week</button>
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
                            if (transaction.category_id === 1){
                                return <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payee}</td>
                                    <td>{transaction.amount}</td>
                                    <td></td>
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
                            if (transaction.category_id === 2){
                                return <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.payee}</td>
                                    <td>{transaction.amount}</td>
                                    <td></td>
                                </tr>
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewSummary;