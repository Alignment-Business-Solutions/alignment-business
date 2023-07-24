import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "./Table/Table";

function SinglePL() {

    const dispatch = useDispatch();
    const weekData = useSelector(store => store.singlePL);
    const user = useSelector(store => store.user);
    
    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week:1, client:1}}); 
    }, []);

    return (
        <>
        <button>Create New Item</button>

            <Table 
                weekData={weekData}
                accLevel={user.access_level}
            />         
        </>
    );




}


export default SinglePL;














