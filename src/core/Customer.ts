export default class Customer {
  private _id: string;
  private _name: string;
  private _age: number;

  constructor(name: string, age: number, id: string | null = null) {
    this._name = name;
    this._age = age;
    this._id = id || "";
  }

  static empty() {
    return new Customer("", 0);
  }

  // Getters and setters
  get id() {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }
}
