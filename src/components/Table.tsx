import Client from "../core/Client";

interface TableProps {
  clients: Client[];
}

export default function Table(props: TableProps) {
  function renderHeaderTable(): JSX.Element {
    return (
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Idade</th>
      </tr>
    );
  }

  function renderClients(): React.ReactNode {
    return props.clients?.map((client, i) => {
      return (
        <tr key={client.getId}>
          <td>{client.getId}</td>
          <td>{client.getName}</td>
          <td>{client.getAge}</td>
        </tr>
      );
    });
  }

  return (
    <table>
      <thead>{renderHeaderTable()}</thead>
      <tbody>{renderClients()}</tbody>
    </table>
  );
}
