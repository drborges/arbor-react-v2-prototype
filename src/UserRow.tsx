import { memo } from "react";
import { User } from "./types";

type UserRowProps = {
  user: User;
  onRemove: (arg0: User) => void;
};

export const UserRow = memo(({ user, onRemove }: UserRowProps) => {
  console.log("... UserRow:", user);
  return (
    <li>
      <input
        placeholder="Name"
        value={user.name}
        onChange={(e) => {
          user.name = e.target.value;
        }}
      />
      <input
        placeholder="Age"
        value={user.age}
        onChange={(e) => {
          user.age = parseInt(e.target.value, 10);
        }}
      />
      <button onClick={() => onRemove(user)}>Remove</button>
      <button
        onClick={() => {
          user.$mutate((u) => {
            u.age++;
            u.age++;
          });
        }}
      >
        Age +2
      </button>
    </li>
  );
});
