import { Button, Typography } from "@mui/material";

function ClientListItem({ assignClient, client }) {
  return (
    <>
      <Typography variant="h6">{client.company_name}</Typography>
      <Button variant="contained" onClick={() => assignClient(client.id)}>
        Add
      </Button>
    </>
  );
}

export default ClientListItem;
