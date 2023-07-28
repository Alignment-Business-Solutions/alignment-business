import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AllPL_Table from "./AllPL_Table/AllPLTable";
import ExportCSV from "../SinglePL/ExportCSV/ExportCSV"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ExportAllWeeks from "./ExportAllCSV/ExportAllCSV";

function AllPL() {

    const weekData = useSelector(store => store.singlePL);
    const categories = useSelector(store => store.categories); 
    const allWeeks = useSelector(store => store.allWeeks);
    const client_id = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    
    function gotToWeek(week, client_id) {
        console.log(week, client_id);
       history.push(`/singlePL/${client_id}/${week[0].week_id}`); 
    }
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WEEKS' });
        dispatch({ type: 'FETCH_CAT' });
        dispatch({ type: "FETCH_SELECTED_CLIENT", payload: client_id});
    }, []);


    return (
        <div>
            <h2>All Weeks Profits & Loss</h2>
            <ExportAllWeeks weeks={allWeeks} categories={categories}/>
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
                                    <button onClick={()=>gotToWeek(week, client_id.client_id)}>Click To Edit This Week!</button>
                                    {week && <ExportCSV weekData={week} categories={categories}/> }

                                    
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
