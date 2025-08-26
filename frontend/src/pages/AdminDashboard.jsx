import  { useState } from "react";
import VenueManagement from "../Component/VenueManagement";
import UserManagement from "../Component/UserManagement";
import  Button  from "../Component/Button";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("venues");
  const [users,setUsers]= useState([])

  return (
    <div className=" w-full mt-10 ">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === "venues" ? "default" : "outline"}
          onClick={() => setActiveTab("venues")}
        >
          Venue Management
        </Button>
        <Button
          variant={activeTab === "users" ? "default" : "outline"}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </Button>
      </div>
   

      {/* Content */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        {activeTab === "venues" ? <VenueManagement /> : <UserManagement  />}
      </div>
    </div>
  );
}
