function ClientListItem({ assignClient, client }) {

  return (
    <>
      <p>{client.company_name}</p>
      <button onClick={() => assignClient(client.id)}> Add</button>
    </>
  );
}

export default ClientListItem;
