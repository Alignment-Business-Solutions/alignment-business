import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MultiPL () {

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WEEKS'});
    }, []);


    return (
        <div>
            <h2>All Weeks Profits & Loss</h2>
        </div>
    )
}

export default MultiPL