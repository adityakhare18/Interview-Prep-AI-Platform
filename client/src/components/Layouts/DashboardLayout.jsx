import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />

      {user ? (
        <div>{children}</div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Loading user data...
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
