import React,{useEffect, useReact} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MyClients from '../MyClients/MyClients';
function ClientList() {
    const dispatch = useDispatch();
    const allClients = useSelector((store) => store.allClients)

    useEffect(() => {
        dispatch({
          type: "FETCH_ALL_CLIENTS",
        });
      }, []);

      const assignClient = () => {
        console.log('Assigned to Accountant')
      }

    return (
        <div>
        <h1>Clients</h1>
        <ul>
            {allClients && allClients.map((client, i) => (
                <>
                <li key={i}>
                    {client.company_name}
                </li>
                <button onClick={assignClient}> Add</button>
                </>
            ))}
              
        </ul>
         
   </div> 
   )
}

export default ClientList