import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SinglePLMultiView from "./MultiPL/SinglePL(inMulti)";

function AllPL() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allWeeks = useSelector(store => store.allWeeks);
    const allPL = useSelector(store => store.allPL)

    // function pageLoad(allWeeks) {
    //     console.log('in pageLoad function!');
    //     allWeeks.forEach(week => {
    //         dispatch({type:"ADD_TO_ALLPL", payload: {week: week.id, client: client}}); 
    //     });
    // };

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_WEEKS' });
        // pageLoad(allPL)
    }, []);


    return (
        <div>
            <h2>All Weeks Profits & Loss</h2>

            <div>
                {allWeeks.map((week, i) => (
                    <SinglePLMultiView week = {week} client = {1} />
))}
            </div>
            {/* <div>
                {allPL.map((week, i) => (
                    <SinglePLMultiView week = {week} client = {1} />
))}
            </div> */}
            <div>
                {allWeeks.map(week => (
                    <div>
                        <p>{week.start_date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllPL;