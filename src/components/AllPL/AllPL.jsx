import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AllPL_Table from "./AllPL_Table/AllPLTable";

function AllPL() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allWeeks = useSelector(store => store.allWeeks);

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WEEKS' });
    }, []);


    return (
        <div>
            <h2>All Weeks Profits & Loss</h2>

            <div>
                {allWeeks.map(week => (
                    <table>
                        <thead>
                            <tr>
                                <th>Week of "Insert Week Here"</th>
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
                            {week.map(transaction => {
                                if (transaction.category_id === 1 && transaction.paid === true) {
                                    return <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.payee}</td>
                                        <td>{transaction.amount}</td>
                                        <td><input type="checkbox" checked readOnly /></td>
                                    </tr>
                                } else if (transaction.category_id === 1 && transaction.paid === false) {
                                    return <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.payee}</td>
                                        <td>{transaction.amount}</td>
                                        <td><input type="checkbox" disabled /></td>
                                    </tr>
                                }
                            })}
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Expenses</td>
                            </tr>
                            {week.map(transaction => {
                                if (transaction.category_id === 2 && transaction.paid === true) {
                                    return <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.payee}</td>
                                        <td>{transaction.amount}</td>
                                        <td><input type="checkbox" checked readOnly /></td>
                                    </tr>
                                } else if (transaction.category_id === 2 && transaction.paid === false) {
                                    return <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.payee}</td>
                                        <td>{transaction.amount}</td>
                                        <td><input type="checkbox" disabled /></td>
                                    </tr>
                                }
                            })}
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <button>Click To Edit This Week!</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    // <AllPL_Table week={week}/>
                ))}
            </div>
        </div>
    )
}

export default AllPL;