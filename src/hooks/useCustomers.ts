import { useEffect, useMemo, useState } from "react";
import Customer from "../core/Customer";
import RepositoryCustomer from "../core/RepositoryCustomer";
import CollectionCustomer from "../backend/db/CollectionCustomer";
import useTableOrForm from "./useTableOrForm";

export default function useCustomer() {
  // Memoize 'repo' to prevent it from being recreated on every render
  const repo: RepositoryCustomer = useMemo(() => new CollectionCustomer(), []);

  const { showForm, showTable } = useTableOrForm();

  const [customer, setCustomer] = useState<Customer>(Customer.empty());
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(getAllCustomers, [repo, showTable]);

  function getAllCustomers() {
    repo.getAll().then(customers => {
      setCustomers(customers);
      showTable();
    });
  }

  function selectedCustomer(customer: Customer) {
    setCustomer(customer);
    showForm();
  }

  async function deletedCustomer(customer: Customer) {
    await repo.delete(customer);
    getAllCustomers();
  }

  function newCustomer() {
    setCustomer(Customer.empty());
    showForm();
  }

  async function saveCustomer(customer: Customer) {
    await repo.save(customer);
    getAllCustomers();
  }

  return {
    customer,
    customers,
    newCustomer,
    saveCustomer,
    deletedCustomer,
    selectedCustomer,
    getAllCustomers,
  };
}
