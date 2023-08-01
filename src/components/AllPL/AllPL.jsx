import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AllPL_Table from "./AllPL_Table/AllPLTable";
import ExportCSV from "../SinglePL/ExportCSV/ExportCSV"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ExportAllWeeks from "./ExportAllCSV/ExportAllCSV";
import "./AllPL.css"

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
            <div className="allpl-table">
                {allWeeks.map(week => (
                    
                    <AllPL_Table week={week} categories={categories}/>
                ))}
            </div>
        </div>
    )
}

export default AllPL;
