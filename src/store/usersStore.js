import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@mail.com",
      role: "Admin",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Sara Smith",
      email: "sara@mail.com",
      role: "Editor",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@mail.com",
      role: "Editor",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Olivia Taylor",
      email: "olivia@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: 7,
      name: "Daniel Anderson",
      email: "daniel@mail.com",
      role: "Admin",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 8,
      name: "Sophia Thomas",
      email: "sophia@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 9,
      name: "James Martinez",
      email: "james@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 10,
      name: "Ava Garcia",
      email: "ava@mail.com",
      role: "Editor",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: 11,
      name: "Robert Lee",
      email: "robert@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 12,
      name: "Mia Clark",
      email: "mia@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 13,
      name: "William Lewis",
      email: "william@mail.com",
      role: "Admin",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 14,
      name: "Charlotte Walker",
      email: "charlotte@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: 15,
      name: "Benjamin Hall",
      email: "benjamin@mail.com",
      role: "Editor",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 16,
      name: "Amelia Young",
      email: "amelia@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    {
      id: 17,
      name: "Lucas Hernandez",
      email: "lucas@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=17",
    },
    {
      id: 18,
      name: "Harper King",
      email: "harper@mail.com",
      role: "Editor",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    {
      id: 19,
      name: "Henry Wright",
      email: "henry@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    {
      id: 20,
      name: "Ella Lopez",
      email: "ella@mail.com",
      role: "User",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
  ],

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { ...user, id: Date.now() }],
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  editUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...updatedUser } : u
      ),
    })),
}));
