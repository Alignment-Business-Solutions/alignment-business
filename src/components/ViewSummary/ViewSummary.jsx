import React from "react";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AddWeekForm from "./AddWeekForm/AddWeekForm";
import RecentPLTable from "./RecentPLTable/RecentPLTable";
import SelectWeekForm from "./SelectWeekForm/SelectWeekForm";

function ViewSummary() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const clientID = params.client_id

    console.log('params for viewSummary is:', params);

    function pageLoad() {

        dispatch({ type: 'FETCH_RECENT_PL', payload: {client: clientID} })
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