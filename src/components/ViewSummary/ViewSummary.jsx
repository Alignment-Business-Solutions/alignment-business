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
    function pageLoad() {
        dispatch({ type: 'FETCH_RECENT_PL' });
        dispatch({ type: 'FETCH_WEEKS_DROPDOWN'});
        dispatch({ type: "FETCH_SELECTED_CLIENT", payload: client_id});
    }

    useEffect(() => {
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
