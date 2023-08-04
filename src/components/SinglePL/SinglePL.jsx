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
import Example from "./MaterialReactTable/MaterialReactTable";

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
        
        return () => {
            dispatch({type:"UNSET_WEEK_DATA"});
            dispatch({type:"UNSET_IMPORT_DATA"});
        }

    }, []);

    return (
        <>  

            <Example weekData={weekData} categories={categories} weekID={weekID} clientID={clientID} accLevel={user.access_level}/>
                  
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














