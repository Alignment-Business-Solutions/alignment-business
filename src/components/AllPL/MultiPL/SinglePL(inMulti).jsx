import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "./Table/Table";

function SinglePLMultiView({week, client}) {

    const dispatch = useDispatch();
    const weekData = useSelector(store => store.singlePL);
    const user = useSelector(store => store.user);
    const categories = useSelector(store => store.categories);

    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week: week.id, client: client}});
    }, []);

    return (
        <>
            <Table 
                weekData={weekData}
                categories={categories}
            />         
        </>
    );




}


export default SinglePLMultiView;














