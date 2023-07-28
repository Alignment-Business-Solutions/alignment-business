import React from "react";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import AddWeekForm from "./AddWeekForm/AddWeekForm";
import RecentPLTable from "./RecentPLTable/RecentPLTable";
import SelectWeekForm from "./SelectWeekForm/SelectWeekForm";

function ViewSummary() {

    const dispatch = useDispatch();
    const client_id = useParams();
    const params = useParams();
    const clientID = params.client_id;

    function pageLoad() {
        // dispatching to fetch_recent_pl.saga.js
        dispatch({ type: 'FETCH_RECENT_PL', payload: {client: clientID} });
        // dispatching to fetchWeeksDropdown.saga.js
        dispatch({ type: 'FETCH_WEEKS_DROPDOWN'});
        // dispatching to clients.saga.js
        dispatch({ type: "FETCH_SELECTED_CLIENT", payload: client_id});
    }

    useEffect(() => {
        // on page load run this function
        pageLoad();
    }, [])

    return (
        <div>
            <AddWeekForm />
            <RecentPLTable />
            <SelectWeekForm />
        </div>
    )
}

export default ViewSummary;
