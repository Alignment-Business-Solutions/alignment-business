function ClientListItem({ assignClient, client }) {

  return (
    <>
      <p>{client.company_name}</p>
      <button onClick={assignClient}> Add</button>
    </>
  );
}

export default ClientListItem;
