import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";

function MyClientsItem({client}) {

    const path = `/viewsummary/${client.client_id}`
    const dispatch = useDispatch();

    console.log('oneClient is:', client);

    const removeClient = (client_id) => {
        dispatch({
            type: 'REMOVE_CLIENT',
            payload: {client_id}
        })
        console.log("Assigned to Accountant");   
  }

    return (
        <div>
            <li > {client.company_name}</li>
            <Link to={path} >View Client Details</Link>
            <button onClick={() => removeClient(client.client_id)}>❌</button>
        </div>
    )
}

export default MyClientsItem