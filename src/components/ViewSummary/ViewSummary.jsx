import React from "react";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box } from "@mui/material";

import AddWeekForm from "./AddWeekForm/AddWeekForm";
import RecentPLTable from "./RecentPLTable/RecentPLTable";
import SelectWeekForm from "./SelectWeekForm/SelectWeekForm";
import './ViewSummary.css';

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
        <div className="center">
            <p className="center-text">Select a Week from the menu to view/edit details!</p>
            <br/>
            <SelectWeekForm />
            <br/>
            <AddWeekForm />
            <br/>
            <RecentPLTable />
        </div>
    )
}

export default ViewSummary;
