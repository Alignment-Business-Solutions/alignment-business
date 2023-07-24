import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


function SinglePL() {

    const dispatch = useDispatch();
    const weekData = useSelector(store => store.singlePLReducer);


    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week:1, client:2}}); 
    }, []);






    return (
        <p>as;dlkfjas;ldkfjfa;sldkfjl</p>
    );




}


export default SinglePL;














