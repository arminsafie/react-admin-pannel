import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useUsersStore } from "../store/usersStore";
import { useSettingsStore } from "../store/settingsStore";
export default function Users() {
  const { users, deleteUser, editUser } = useUsersStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Get single user if ID is in params
  const selectedUser = id ? users.find((u) => u.id === parseInt(id)) : null;

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, avatar: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (id) => {
    editUser(id, formData);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };
  const sidebarWidth = useSettingsStore((s) => s.sidebarWidth);

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900 bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 ${
          sidebarWidth === "compact"
            ? "md:ml-54"
            : sidebarWidth === "wide"
            ? "md:ml-80"
            : "md:ml-64"
        } `}
      >
        <Navbar />
        <main className="p-4 md:p-6 md:row-span-8 md:col-span-4 mt-16 md:mt-0 mb-20 md:mb-0">
          <div className="max-w-7xl mx-auto">
            {selectedUser ? (
              // Detail View
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-transparent dark:border-gray-700">
                <button
                  onClick={() => navigate("/users")}
                  className="mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Back to Users
                </button>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Avatar Section */}
                  <div className="md:col-span-1 flex flex-col items-center">
                    {editingId === selectedUser.id ? (
                      <div className="w-full flex flex-col items-center gap-4">
                        <img
                          src={formData.avatar || selectedUser.avatar}
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full text-sm"
                        />
                      </div>
                    ) : (
                      <img
                        src={selectedUser.avatar}
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
                      />
                    )}
                  </div>

                  {/* User Details Section */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold dark:text-white mb-2">
                        {editingId === selectedUser.id ? (
                          <input
                            type="text"
                            value={formData.name || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full"
                          />
                        ) : (
                          selectedUser.name
                        )}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        {editingId === selectedUser.id ? (
                          <input
                            type="email"
                            value={formData.email || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full"
                          />
                        ) : (
                          selectedUser.email
                        )}
                      </p>
                    </div>

                    <div className="border-t border-transparent dark:border-gray-700 pt-6">
                      <label className="block text-sm font-semibold dark:text-gray-300 mb-2">
                        Role
                      </label>
                      {editingId === selectedUser.id ? (
                        <select
                          value={formData.role || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded w-full md:w-48"
                        >
                          <option value="User">User</option>
                          <option value="Editor">Editor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      ) : (
                        <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                          {selectedUser.role}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      {editingId === selectedUser.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(selectedUser.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(selectedUser)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                          >
                            Edit User
                          </button>
                          <button
                            onClick={() => {
                              deleteUser(selectedUser.id);
                              navigate("/users");
                            }}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                          >
                            Delete User
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // List View
              <>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
                  Users
                </h1>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                      <tr className="text-left">
                        <th className="p-4 dark:text-white font-semibold">
                          Avatar
                        </th>
                        <th className="p-4 dark:text-white font-semibold">
                          Name
                        </th>
                        <th className="p-4 dark:text-white font-semibold">
                          Email
                        </th>
                        <th className="p-4 dark:text-white font-semibold">
                          Role
                        </th>
                        <th className="p-4 dark:text-white font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr
                          key={u.id}
                          className="border-t border-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="p-4">
                            {editingId === u.id ? (
                              <div className="flex flex-col gap-2">
                                <img
                                  src={formData.avatar || u.avatar}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleAvatarChange}
                                  className="bg-gray-200 dark:bg-gray-700 dark:text-white px-2 py-1 rounded text-xs"
                                />
                              </div>
                            ) : (
                              <img
                                src={u.avatar}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                          </td>
                          <td className="p-4 dark:text-white">
                            {editingId === u.id ? (
                              <input
                                type="text"
                                value={formData.name || ""}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                              />
                            ) : (
                              u.name
                            )}
                          </td>
                          <td className="p-4 dark:text-white">
                            {editingId === u.id ? (
                              <input
                                type="email"
                                value={formData.email || ""}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                              />
                            ) : (
                              u.email
                            )}
                          </td>
                          <td className="p-4 dark:text-white">
                            {editingId === u.id ? (
                              <select
                                value={formData.role || ""}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    role: e.target.value,
                                  })
                                }
                                className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                              >
                                <option value="User">User</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                              </select>
                            ) : (
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                                {u.role}
                              </span>
                            )}
                          </td>
                          <td className="p-4 flex gap-2">
                            {editingId === u.id ? (
                              <>
                                <button
                                  onClick={() => handleSaveEdit(u.id)}
                                  className="text-green-500 hover:text-white hover:bg-green-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-gray-500 hover:text-white hover:bg-gray-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditClick(u)}
                                  className="text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteUser(u.id)}
                                  className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid gap-4">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-4"
                    >
                      {editingId === u.id ? (
                        <div className="space-y-3">
                          <div className="flex flex-col gap-2">
                            <img
                              src={formData.avatar || u.avatar}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              className="bg-gray-200 dark:bg-gray-700 dark:text-white px-2 py-1 rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs dark:text-gray-300 mb-1 font-semibold">
                              Name
                            </label>
                            <input
                              type="text"
                              value={formData.name || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-xs dark:text-gray-300 mb-1 font-semibold">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-xs dark:text-gray-300 mb-1 font-semibold">
                              Role
                            </label>
                            <select
                              value={formData.role || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  role: e.target.value,
                                })
                              }
                              className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded w-full"
                            >
                              <option value="User">User</option>
                              <option value="Editor">Editor</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleSaveEdit(u.id)}
                              className="flex-1 text-green-500 hover:text-white hover:bg-green-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="flex-1 text-gray-500 hover:text-white hover:bg-gray-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-3 mb-3">
                            <img
                              src={u.avatar}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold dark:text-white">
                                {u.name}
                              </h3>
                              <p className="text-sm dark:text-gray-400">
                                {u.email}
                              </p>
                              <span className="inline-block mt-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-semibold">
                                {u.role}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditClick(u)}
                              className="flex-1 text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="flex-1 text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 transition-all duration-300 rounded-lg cursor-pointer font-semibold text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
