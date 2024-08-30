import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";

export default function CheckBox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex justify-content-center card">
      <Checkbox
        variant="filled"
        onChange={(e) => setChecked(e.checked)}
        checked={checked}
      ></Checkbox>
    </div>
  );
}
