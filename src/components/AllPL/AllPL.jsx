import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function AllPL() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allPL = useSelector(store => store.allWeeks);



    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WEEKS' });
    }, []);


    return (
        <div>
            <h2>All Weeks Profits & Loss</h2>

            <div>
                {allPL.map((week, i) => (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Payee</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Paid?</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    )
}

export default AllPL;