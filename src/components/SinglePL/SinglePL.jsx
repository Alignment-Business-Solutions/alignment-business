import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "./Table/Table";
import ItemForm from "./ItemForm/ItemForm";
import ImportRegCSV from "./ImportCSV/ImportRegCSV";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import ExportCSV from './ExportCSV/ExportCSV.jsx';

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
    console.log('pathData is:', pathData);

    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week: pathData.week_id/1, client: pathData.client_id/1}}); 
    }, []);

    return (
        <>
            {weekData && <ExportCSV weekData={weekData} categories={categories}/> }
                <p>     </p>
                <p>     </p>
                <p>     </p>
                <p>     </p>
            <h1>IMPORT ONLY SUPPORTS REGISTER and QB CSV'S</h1>
            <ImportRegCSV week_id={1} client_id={1}/>
                <p>     </p>
                <p>     </p>
                <p>     </p>
                <p>     </p>           
            {formVis ? (
            <ItemForm categories={categories}/> 
                ) : (<></>)} 
            <button onClick={showForm}>Create New Item</button>
                <p>     </p>
                <p>     </p>
                <p>     </p>
                <p>     </p>
            <Table 
                weekData={weekData}
                accLevel={user.access_level}
                categories={categories}
                tableType={1}
            />
            <h1> IMPORTED DATA </h1>
            <h3> Data not saved !!!</h3>
            <Table
                weekData={importRegData}
                accLevel={user.access_level}
                categories={categories}
                tableType={2}
            />
        </>
    );




}


export default SinglePL;














