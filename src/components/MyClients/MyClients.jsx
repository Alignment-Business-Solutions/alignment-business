import React, { useEffect, useReact } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function MyClients() {

    const dispatch = useDispatch();
    const myClients = useSelector((store) => store.myClients);
    const history = useHistory()

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CLIENTS",
    });
  }, []);

  const goClients = () => {
    history.push('/clients')
  }
   
  const removeClient = (client_id, accountant_id) => {
  
        dispatch({
            type: 'REMOVE_CLIENT',
            payload: client_id, accountant_id
        })
        console.log("Assigned to Accountant");
      
  }

        return (
            <div>
                <h2>Accountants's Clients</h2>
            <ul>
                {myClients && myClients.map((oneClient, i) => (
                    <>
                    <li key={i}> {oneClient.company_name}</li>
                    
                    <button onClick={() => removeClient(oneClient.id, oneClient.accountant_id)}>❌</button>
               </> ))}
                
            </ul>
            <button onClick={goClients}>Clients</button>
        </div>)
}

export default MyClients