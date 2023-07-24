import React,{useEffect, useReact} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import MyClients from '../MyClients/MyClients';
function ClientList() {
    const dispatch = useDispatch();
    const allClients = useSelector((store) => store.allClients)
    const history = useHistory()

    useEffect(() => {
        dispatch({
          type: "FETCH_ALL_CLIENTS",
        });
      }, []);

      const assignClient = () => {
        console.log('Assigned to Accountant')
      }

      const goToMyClients = () => {
        history.push("/myClients");
      }

    return (
        <div>
        <h1>Clients</h1>
        <ul>
            {allClients && allClients.map((client, i) => (
               
                <li key={i}>
                    {client.company_name}
                     <button onClick={assignClient}> Add</button>
                </li>
               
               
            ))}
              
        </ul>
         <button onClick={goToMyClients}>Accountant's Clients</button>
   </div> 
   )
}

export default ClientList