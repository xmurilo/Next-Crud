import { useEffect } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useCustomer from "../hooks/useCustomers";

export default function Home() {
  const {
    customer,
    customers,
    visibleTable,
    showTable,
    newCustomer,
    saveCustomer,
    deletedCustomer,
    selectedCustomer,
  } = useCustomer();
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
      <Layout title="Cadastro Simples">
        {visibleTable ? (
          <>
            <div className="flex justify-end">
              <Button className="mb-4" onClick={newCustomer}>
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
          <Form customer={customer} changeCustomer={saveCustomer} canceled={showTable} />
        )}
      </Layout>
    </div>
  );
}
