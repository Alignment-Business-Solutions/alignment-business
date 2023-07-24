import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function ViewSummary () {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_RECENT_PL'})
    }, [])

    return (
        <div>
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

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewSummary;