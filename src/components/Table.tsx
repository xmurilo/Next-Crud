import Customer from "../core/Customer";
import { EditionIcon } from "./Icons";
import { TrashIcon } from "./Icons";
interface TableProps {
  customers: Customer[];
  selectedCustomer?: (customer: Customer) => void;
  deletedCustomer?: (customer: Customer) => void;
}

export default function Table(props: TableProps) {
  const showActions = props.selectedCustomer && props.deletedCustomer;

  function renderHeaderTable(): JSX.Element {
    return (
      <tr>
        <th className="text-left p-4 ">Código</th>
        <th className="text-left p-4 ">Nome</th>
        <th className="text-left p-4 ">Idade</th>
        {showActions ? <th className="text-left p-4 ">Ações</th> : false}
      </tr>
    );
  }

  function renderData(): React.ReactNode {
    return props.customers?.map((customer, i) => {
      return (
        <tr key={customer.id} className={`${i % 2 == 0 ? "bg-purple-200" : "bg-purple-100"}`}>
          <td className="text-left p-4 ">{customer.id}</td>
          <td className="text-left p-4 ">{customer.name}</td>
          <td className="text-left p-4 ">{customer.age}</td>
          {showActions ? renderActions(customer) : false}
        </tr>
      );
    });
  }

  function renderActions(customer: Customer) {
    return (
      <td className="flex justify-center">
        {props.selectedCustomer ? (
          <button
            className={`flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 p-2 m-1`}
            onClick={() => props.selectedCustomer?.(customer)}
          >
            {EditionIcon}
          </button>
        ) : (
          false
        )}

        {props.deletedCustomer ? (
          <button
            className={`flex justify-center items-center text-red-500 rounded-full hover:bg-purple-50 p-2 m-1`}
            onClick={() => props.deletedCustomer?.(customer)}
          >
            {TrashIcon}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={` text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800  `}>
        {renderHeaderTable()}
      </thead>
      <tbody>{renderData()}</tbody>
    </table>
  );
}
