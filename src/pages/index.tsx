import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Customer from "../core/Customer";

export default function Home() {
  const [visible, setVisible] = useState<"table" | "form">("table");
  const [customer, setCustomer] = useState<Customer>(Customer.empty());

  const customers = [
    new Customer("Ana", 34, "1"),
    new Customer("Bia", 45, "2"),
    new Customer("Carlos", 23, "3"),
    new Customer("Daniel", 54, "4"),
  ];

  function selectedCustomer(customer: Customer) {
    setCustomer(customer);
  }

  function deletedCustomer(customer: Customer) {
    console.log("Excluindo..." + customer.getName);
  }

  function saveCustomer(customer: Customer) {
    console.log(customer);
    setVisible("table");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
      <Layout title="Cadastro Simples">
        {visible == "table" ? (
          <>
            <div className="flex justify-end">
              <Button className="mb-4" onClick={() => setVisible("form")}>
                Novo Cliente
              </Button>
            </div>

            <Table
              customers={customers}
              selectedCustomer={selectedCustomer}
              deletedCustomer={deletedCustomer}
            ></Table>
          </>
        ) : (
          <Form
            customer={customers[0]}
            changeCustomer={saveCustomer}
            canceled={() => setVisible("table")}
          />
        )}
      </Layout>
    </div>
  );
}
