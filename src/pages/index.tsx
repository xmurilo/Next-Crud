import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useCustomer from "../hooks/useCustomers";
import useTableOrForm from "../hooks/useTableOrForm";

export default function Home() {
  const { customer, customers, newCustomer, saveCustomer, deletedCustomer, selectedCustomer } =
    useCustomer();

  const { tableVisible, showTable } = useTableOrForm();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
      <Layout title="Cadastro Simples">
        {tableVisible ? (
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
