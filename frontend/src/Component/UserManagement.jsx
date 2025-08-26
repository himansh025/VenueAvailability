import React, { useEffect, useState } from "react";
import Input from "../Component/Input";
import Button from "../Component/Button";
import AddUserModal from "./Admin/UserMangement/AddUserModal";
import axiosInstance from "../Config/apiconfig";
import UpdateUserModal from "./Admin/UserMangement/UpdateUserModal";
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState();
  const [addUserModal, setAddUserModal] = useState(false)
  const [updateUserModal, setUpdateUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false)

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get(`/users`);
      // console.log("res of users", res.data)
      setUsers(res.data)
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };


  console.log(users)
  const filteredUsers = users.filter((u) => {
    if (search != null) {
      return u?.name?.toLowerCase().includes(search.toLowerCase())
    }
    return true
  }
  );



  const deleteUserhandle = async (id) => {
    try {
      await axiosInstance.delete(`/users/delete/${id}`)
      setUsers(users.filter((u) => u._id !== id))
    } catch (err) {
      console.error("Error updating user", err);
    }

  }

  useEffect(() => {
    getUsers()
  }, [])

  if (addUserModal) {
    return (

      <AddUserModal
        addUserModal={addUserModal}
        onClose={() => setAddUserModal(false)}
        onSuccess={() => console.log("User added, refresh list here")}
      />

    )
  }
  const upateUserhandle = async (id) => {
    console.log(id)
    setSelectedUserId(id);  
    setUpdateUserModal(true)
      console.log(updateUserModal)

    
  }

 
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      Search  User
      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setAddUserModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200 rounded-md">
          <thead className=" sm:table-header-group">
            <tr className="bg-gray-100">
              <th className="p-1 text-left">Name</th>
              <th className="p-1 text-left">Email</th>

              <th className="p-1 text-left">Role</th>
              <th className="p-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user?._id} className="border-t">
                  <td className="p-1">{user.name}</td>
                  <td className="p-1">{user.email}</td>
                  <td className="p-1">{user.role}</td>
                  <td className="p-1 md:p-2 flex flex-col md:flex-row gap-1 md:gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => upateUserhandle(user._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) => deleteUserhandle(user?._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No user found
                </td>
              </tr>
            )}
          </tbody>

        </table>
          {updateUserModal && (
        <UpdateUserModal
          userId={selectedUserId}
          isOpen={updateUserModal}
          onClose={() => setUpdateUserModal(false)}
          onSuccess={(updatedUser) => {
            // refresh list after update
            setUsers((prev) =>
              prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
            );
          }}
        />
      )}
      </div>
    </div>
  );
}
