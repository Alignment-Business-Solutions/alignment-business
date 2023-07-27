import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "./Table/Table";
import ItemForm from "./ItemForm/ItemForm";
import ImportRegCSV from "./ImportCSV/ImportRegCSV";

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


    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week:1, client:1}}); 
    }, []);

    return (
        <>
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














