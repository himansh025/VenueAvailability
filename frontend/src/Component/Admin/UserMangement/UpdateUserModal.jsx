import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Config/apiconfig";

export default function UpdateUserModal({userId, updateUserModal, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    role: "admin",
  });
   useEffect(() => {
    // Optionally fetch existing user data here if needed
  }, [userId]);


  const [loading, setLoading] = useState(false);

  if (!updateUserModal) return null; // don't render if modal not open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       const { data }= await axiosInstance.post(`/users/updete/${userId}`, formData); // API call
      setLoading(false);
      onSuccess && onSuccess(data); // callback to refresh
      onClose(); // close modal after success
    } catch (error) {
      setLoading(false);
      console.error("Error update user:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">update User Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />


          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "Saving..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
