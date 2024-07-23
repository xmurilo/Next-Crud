import Customer from "@/src/core/Customer";
import RepositoryCustomer from "@/src/core/RepositoryCustomer";
import { firestore } from "../config";
import { collection } from "firebase/firestore";
import firebase from "firebase/compat/app";

export default class CollectionCustomer implements RepositoryCustomer {
  converter = {
    toFirestore(customer: Customer) {
      return {
        name: customer.getName,
        age: customer.getAge,
      };
    },

    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions,
    ): Customer {
      const data = snapshot.data(options);
      return new Customer(data.name, data.age, snapshot.id);
    },
  };

  async save(customer: Customer): Promise<Customer> {
    if (customer?.getId) {
      await this.collection().doc(customer.getId).set(customer);
      return customer;
    } else {
      const docRef = await this.collection().add(customer);
      const doc = await docRef.get();
      return doc.data() as Customer;
    }
  }

  async delete(customer: Customer): Promise<void> {
    return this.collection().doc(customer.getId).delete();
  }

  async getAll(): Promise<Customer[]> {
    const query = await this.collection().get();
    return query.docs.map(doc => doc.data()) ?? [];
  }

  private collection() {
    return firebase.firestore().collection("customers").withConverter(this.converter);
  }
}
