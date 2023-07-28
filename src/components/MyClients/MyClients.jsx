import React, { useEffect, useReact } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import MyClientsItem from "./MyClientsItem/MyClientsItem";


function MyClients() {

    const dispatch = useDispatch();
    const myClients = useSelector((store) => store.myClients);
    const history = useHistory()

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CLIENTS",
    });
      dispatch({type:"UNSET_SELECTED_CLIENT"});
  }, []);

  const goClients = () => {
    history.push('/clients')
  }
   
  const removeClient = (client_id) => {
        dispatch({
            type: 'REMOVE_CLIENT',
            payload: {client_id}
        })
        console.log("Assigned to Accountant");   
  }

  // console.log('my clients list is:', myClients);

        return (
            <div>
                <h2>Accountants's Clients</h2>
            <ul>
                {myClients && myClients.map((client, i) => (
                  <MyClientsItem key={i} client={client}/>

               ))}
                
            </ul>
            <button onClick={goClients}>Clients</button>
        </div>)
}

export default MyClients
