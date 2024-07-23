import { useState } from "react";

export default function useTableOrForm() {
  const [visible, setVisible] = useState<"table" | "form">("table");

  const showForm = () => setVisible("form");
  const showTable = () => setVisible("table");

  return {
    visibleForm: visible == "form",
    visibleTable: visible == "table",
    showForm,
    showTable,
  };
}
