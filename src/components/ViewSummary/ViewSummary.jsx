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

    function pageLoad(recentPL) {
        dispatch({ type: 'FETCH_RECENT_PL' })
    }

    function createNewWeek() {
        console.log('Create New Week Button Clicked!');
        setAddClicker(true)
    }



    useEffect(() => {
        pageLoad();
    }, [])

    return (
        <div>
            {
                addClicker ?
                <form>
                    <label>Starting Date </label>
                </form>
                 :
                <button onClick={() => createNewWeek()}>Create New Week</button>
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