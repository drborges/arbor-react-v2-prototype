import { useCallback } from "react";

import { UserRow } from "./UserRow";
import { NewUserForm } from "./NewUserForm";
import { useArbor } from "./hooks/useArbor";

import { Form, User } from "./types";

import "./styles.css";

const initialState = {
  form: { name: "", age: "" },
  users: [
    { $id: "users.1", name: "Diego", age: 35 },
    { $id: "users.2", name: "Bianca", age: 27 },
    { $id: "users.3", name: "Ronaldo", age: 35 },
    { $id: "users.4", name: "Giuseppe", age: 4 }
  ]
};

export default function App() {
  const { store, undo, redo } = useArbor(initialState);

  const handleAddUser = useCallback(() => {
    const form: Form = store.state.form;
    const users: User[] = store.state.users;
    users.push({
      $id: `users.${users.length + 1}`,
      name: form.name,
      age: parseInt(form.age, 10)
    });
    form.name = "";
    form.age = "";
  }, [store]);

  const handleRemoveUser = useCallback(
    (user: User) => {
      const users: User[] = store.state.users;
      const indexToRemove = users.findIndex((u) => u.$id === user.$id);
      store.state.users.splice(indexToRemove, 1);
    },
    [store]
  );

  const handleReset = useCallback(() => {
    const form = store.state.form;
    form.name = "";
    form.age = "";
  }, [store]);

  return (
    <div className="App">
      <NewUserForm
        form={store.state.form}
        onAdd={handleAddUser}
        onUndo={undo}
        onRedo={redo}
        onReset={handleReset}
      />

      <ul>
        {store.state.users.map((user) => (
          <UserRow key={user.$id} user={user} onRemove={handleRemoveUser} />
        ))}
      </ul>
    </div>
  );
}
