import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableComp from "./Table/Table";
import ItemForm from "./ItemForm/ItemForm";
import ImportRegCSV from "./ImportCSV/ImportRegCSV";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import './SinglePL.css';
import ExportCSV from './ExportCSV/ExportCSV.jsx';
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

function SinglePL() {

    const dispatch = useDispatch();
    const weekData = useSelector(store => store.singlePL);
    const user = useSelector(store => store.user);
    const categories = useSelector(store => store.categories); 
    const importRegData = useSelector(store => store.importRegData); 
    const [formVis, setFormVis] = useState(false);

    function showForm() {
        setFormVis(!formVis);    
    }

    const pathData = useParams();
    const weekID = pathData.week_id/1;
    const clientID = pathData.client_id/1;
    console.log('clientID is:', clientID);
    const path = `/viewsummary/${clientID}`


    console.log('pathData is:', pathData);

    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week: weekID, client: clientID}}); 
        dispatch({ type: "FETCH_SELECTED_CLIENT", payload: pathData});
    }, []);

    return (
        <>  
            <div className="toolBtns">
                {user.access_level !== 0 ? (
                    <>
                        <Button onClick={showForm}>Create New Item</Button>
                        <ImportRegCSV week_id={weekID} client_id={clientID}/>
                        {weekData && <ExportCSV weekData={weekData} categories={categories}/> }
                    </>
                ):(<></>)}
            </div>
            {formVis ? (
            <ItemForm categories={categories} clientID={clientID} weekID={weekID}/> 
                ) : (<></>)} 

            <TableComp 
                weekData={weekData}
                accLevel={user.access_level}
                categories={categories}
                tableType={1}
                weekID={weekID}
                clientID={clientID}
            />
                  
            <h1> IMPORTED DATA </h1>
            <h3> Data not saved !!!</h3>
            <TableComp
                weekData={importRegData}
                accLevel={user.access_level}
                categories={categories}
                tableType={2}
                weekID={weekID}
                clientID={clientID}
            />
            <Link
                to={path}
            >
                Go Back To Summary Page
            </Link>

        </>
    );
}

export default SinglePL;














