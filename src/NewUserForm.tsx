import { memo } from "react";
import { Form } from "./types";

type NewUserFormProps = {
  form: Form;
  onAdd: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
};

export const NewUserForm = memo(
  ({ form, onAdd, onUndo, onRedo, onReset }: NewUserFormProps) => {
    console.log("... NewUserForm:", form);
    return (
      <div>
        <input
          onChange={(e) => {
            form.name = e.target.value;
          }}
          placeholder="Name"
          value={form.name}
        />
        <input
          onChange={(e) => {
            form.age = e.target.value;
          }}
          placeholder="Age"
          value={form.age}
          type="number"
        />
        <button onClick={onAdd}>Add</button>
        <button onClick={onUndo}>Undo</button>
        <button onClick={onRedo}>Redo</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
);
