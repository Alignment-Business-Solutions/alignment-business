import React,{useEffect, useReact} from 'react'
import {useDispatch, useSelector} from 'react-redux'

function ClientList() {
    const dispatch = useDispatch();
    const myClients = useSelector((store) => store.myClients)

    useEffect(() => {
        dispatch({
          type: "FETCH_MY_CLIENTS",
        });
      }, []);


    return (
        <div>
        <h1>Under Construction</h1>

   </div> 
   )
}

export default ClientList