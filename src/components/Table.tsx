import Client from "../core/Client";

interface TableProps {
  clients: Client[];
}

export default function Table(props: TableProps) {
  function renderHeaderTable(): JSX.Element {
    return (
      <tr>
        <th className="text-left p-4 ">Código</th>
        <th className="text-left p-4 ">Nome</th>
        <th className="text-left p-4 ">Idade</th>
      </tr>
    );
  }

  function renderClients(): React.ReactNode {
    return props.clients?.map((client, i) => {
      return (
        <tr key={client.getId} 
          className={`${i % 2 == 0 ? "bg-purple-200" : "bg-purple-100"}`}>
          <td className="text-left p-4 ">{client.getId}</td>
          <td className="text-left p-4 ">{client.getName}</td>
          <td className="text-left p-4 ">{client.getAge}</td>
        </tr>
      );
    });
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={` text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800  `}>
        {renderHeaderTable()}
      </thead>
      <tbody>{renderClients()}</tbody>
    </table>
  );
}
