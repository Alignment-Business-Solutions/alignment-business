import { Link } from "react-router-dom"

function MyClientsItem({client}) {

    const path = `/viewsummary/${client.client_id}`

    console.log('oneClient is:', client);

    return (
        <div>
            <li > {client.company_name}</li>
            <Link to={path} >View Client Details</Link>
            <button onClick={() => removeClient(client.client_id)}>❌</button>
        </div>
    )
}

export default MyClientsItem