import React from "react";
import { Checkbox } from "primereact/checkbox";

export default function CheckBox({ checked, onChange }) {
  return (
    <div className="flex justify-content-center card">
      <Checkbox variant="filled" onChange={onChange} checked={checked} />
    </div>
  );
}
