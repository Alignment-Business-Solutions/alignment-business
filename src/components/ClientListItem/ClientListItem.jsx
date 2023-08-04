import { Button, Typography } from "@mui/material";

function ClientListItem({ assignClient, client }) {
  return (
    <>
      <Typography style={{ marginBottom: "5px" }} variant="h6">
        {client.company_name}
      </Typography>
      <Button
        style={{ width: "200px" }}
        variant="contained"
        onClick={() => assignClient(client.id)}
      >
        Add
      </Button>
    </>
  );
}

export default ClientListItem;
