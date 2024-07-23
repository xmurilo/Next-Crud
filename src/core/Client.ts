export default class Client {
  private id: string;
  private name: string;
  private age: number;

  constructor(name: string, age: number, id: string | null = null) {
    this.name = name;
    this.age = age;
    this.id = id || "";
  }

  static empty() {
    return new Client("", 0);
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getAge() {
    return this.age;
  }
}
