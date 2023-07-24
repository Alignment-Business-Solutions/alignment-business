import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "./Table/Table";

function SinglePL() {

    const dispatch = useDispatch();
    const weekData = useSelector(store => store.singlePL);


    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week:1, client:1}}); 
    }, []);





    return (
        <Table weekData={weekData}/>         

    );




}


export default SinglePL;














