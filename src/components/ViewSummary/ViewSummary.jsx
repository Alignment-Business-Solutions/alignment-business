import React from "react";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import AddWeekForm from "./AddWeekForm/AddWeekForm";
import RecentPLTable from "./RecentPLTable/RecentPLTable";
import SelectWeekForm from "./SelectWeekForm/SelectWeekForm";
import './ViewSummary.css';

function ViewSummary() {

    const dispatch = useDispatch();
    const client_id = useParams();
    const params = useParams();
    const clientID = params.client_id;
    const recentBalance = useSelector(store => store.recentBalance);

    console.log('Recent balance on viewSummary is:', recentBalance);


    function pageLoad() {
        // dispatching to fetch_recent_pl.saga.js
        dispatch({ type: 'FETCH_RECENT_PL', payload: {client: clientID} });

        dispatch({ type: 'FETCH_RECENT_BALANCE', payload: {client: clientID}});
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
            <Box align="center">
                <p>Most Recent Balance</p>
                <Card variant="outlined"
                    style={{
                      backgroundColor: "#00B4EB",
                      color: "white",
                      width: 200,
                    }}>
                    <CardContent>
                      <Typography sx={{ fontSize: "1.5rem" }}>
                        Week Start Date
                      </Typography>
                      <Typography>
                        {recentBalance.start_date}
                      </Typography>
                      <Typography sx={{ fontSize: "1.2rem" }}>
                        Beginning Cash
                      </Typography>
                      <Typography>
                        {recentBalance.beginning_cash}
                      </Typography>
                      <Typography sx={{ fontSize: "1.2rem" }}>
                        Ending Balance
                      </Typography>
                      <Typography>
                        {recentBalance.ending_balance_actual}
                      </Typography>
                    </CardContent>
                  </Card>
            </Box>
            <br/>
            <AddWeekForm />
            <br/>
            <RecentPLTable />
        </div>
    )
}

export default ViewSummary;
