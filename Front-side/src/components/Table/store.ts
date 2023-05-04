import { create } from "zustand";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  deleteUser: (id: number) => void;
  addUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set(() => ({ users })),
  addUser: (user: User) => set((state) => ({ users: [user, ...state.users] })),
  deleteUser: (id) => {
    axios
      .delete(`http://localhost:4000/users/${id}`)
      .then(() => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
}));
