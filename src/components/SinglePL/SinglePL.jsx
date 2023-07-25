import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "./Table/Table";
import ItemForm from "./ItemForm/ItemForm";


function SinglePL() {

    const dispatch = useDispatch();
    const weekData = useSelector(store => store.singlePL);
    const user = useSelector(store => store.user);
    const categories = useSelector(store => store.categories); 
    const [formVis, setFormVis] = useState(false);

    function showForm() {
        setFormVis(!formVis);    
    }


    useEffect(() => {
        dispatch({type:"FETCH_WEEK", payload: {week:1, client:1}}); 
    }, []);

    return (
        <>

        <ItemForm categories={categories}/> 
        <button onClick={showForm}>Create New Item</button>

            <Table 
                weekData={weekData}
                accLevel={user.access_level}
                categories={categories}
            />         
        </>
    );




}


export default SinglePL;














