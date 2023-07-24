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
        <ul>
            {myClients && myClients.map((client, i) => (
                <li key={i}>
                    {client.company_name}
                </li>
                
              
            ))}
              <button> Add</button>
        </ul>

   </div> 
   )
}

export default ClientList