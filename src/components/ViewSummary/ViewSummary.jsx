import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react";

import AddWeekForm from "./AddWeekForm/AddWeekForm";
import RecentPLTable from "./RecentPLTable/RecentPLTable";
import SelectWeekForm from "./SelectWeekForm/SelectWeekForm";

function ViewSummary() {

    const dispatch = useDispatch();
    const history = useHistory();

    function pageLoad() {
        dispatch({ type: 'FETCH_RECENT_PL' })
        dispatch({ type: 'FETCH_WEEKS_DROPDOWN'})
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