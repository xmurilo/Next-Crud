import { useState } from "react";
import Input from "./Input";
import Client from "../core/Client";
import Button from "./Button";

interface FormProps {
  client: Client;
  changeCustomer?: (client: Client) => void;
  canceled?: () => void;
}

export default function Form(props: FormProps) {
  const id = props.client?.getId;

  const [name, setName] = useState(props.client?.getName ?? "");
  const [age, setAge] = useState(props.client?.getAge ?? 0);

  return (
    <div>
      {id && id !== "" ? <Input onlyRead text="Código" value={id} className={"mb-4"} /> : false}

      <Input text="Nome" value={name} onChange={setName} className={"mb-4"} />
      <Input text="Idade" type="number" value={age} onChange={setAge} />

      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={() => props.changeCustomer?.(new Client(name, +age, id))}
        >
          {id ? "Alterar" : "Salvar"}
        </Button>
        <Button onClick={props.canceled}>Cancelar</Button>
      </div>
    </div>
  );
}
