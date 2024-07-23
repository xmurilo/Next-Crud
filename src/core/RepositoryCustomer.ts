import Customer from "./Customer";

export default interface RepositoryCustomer {
  save(customer: Customer): Promise<Customer>;
  delete(customer: Customer): Promise<void>;
  getAll(): Promise<Customer[]>;
}
