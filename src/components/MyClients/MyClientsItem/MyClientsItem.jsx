import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@mui/material";

function MyClientsItem({ client }) {
  const path = `/viewsummary/${client.client_id}`;
  const dispatch = useDispatch();

  console.log("oneClient is:", client);

  const removeClient = (client_id) => {
    dispatch({
      type: "REMOVE_CLIENT",
      payload: { client_id },
    });
    console.log("Assigned to Accountant");
  };

  return (
    <div>
      <Typography style={{ marginBottom: "5px" }} variant="h6">
        {client.company_name}
      </Typography>
      <Link to={path}><Button variant="contained">View Client Details</Button></Link>
      <br></br>
      <br></br>
      <Button
        style={{ width: "200px" }}
        variant="contained"
        color="secondary"
        onClick={() => removeClient(client.client_id)}
      >
        Remove
      </Button>
    </div>
  );
}

export default MyClientsItem;
