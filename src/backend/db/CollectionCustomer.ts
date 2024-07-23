import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import Customer from "@/src/core/Customer";
import RepositoryCustomer from "@/src/core/RepositoryCustomer";
import { db } from "../config";

export default class CollectionCustomer implements RepositoryCustomer {
  converter = {
    toFirestore(customer: Customer) {
      return {
        name: customer.name,
        age: customer.age,
      };
    },

    fromFirestore(snapshot: any, options: any): Customer {
      const data = snapshot.data(options);
      return new Customer(data.name, data.age, snapshot.id);
    },
  };

  private collection() {
    return collection(db, "customers").withConverter(this.converter);
  }

  async save(customer: Customer): Promise<Customer> {
    if (customer.id) {
      // * Se o ID existe, atualiza o documento
      const customerRef = doc(db, "customers", customer.id).withConverter(this.converter);
      // * O método setDoc atualiza o documento, se ele já existir, ou cria um novo, se não existir
      await setDoc(customerRef, customer);
    } else {
      // * Se o ID não existe, cria um novo documento
      const docRef = await addDoc(this.collection(), customer);
       // * Atualiza o ID do objeto com o ID gerado pelo Firestore
      customer.id = docRef.id;
    }
    return customer;
  }

  async delete(customer: Customer): Promise<void> {
    if (!customer.id) {
      throw new Error("Customer ID is missing");
    }
    await deleteDoc(doc(db, "customers", customer.id));
  }

  async getAll(): Promise<Customer[]> {
    const querySnapshot = await getDocs(this.collection());
    // * O método map percorre todos os documentos retornados e converte cada um deles para um objeto Customer
    return querySnapshot.docs.map(doc => this.converter.fromFirestore(doc, {}));
  }
}
