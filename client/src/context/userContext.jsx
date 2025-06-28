// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATH } from "../utils/apiPath";
// import { createContext } from "react";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (user) {
//             return;
//         }

//         const fetchUser = async () => {
//             try {
//                 const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
//                 setUser(response.data);
//             } catch (error) {
//                 console.log("User not authenticated", error);
//                 clearUser();
//             }
//             finally{
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     },[]);

//     const updateUser = (userData) => {
//         setUser(userData);
//         setLoading(false);
//     }

//     const clearUser = () => {
//         setUser(null);
//     }

//     return (
//         <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserProvider


import React, { useEffect, useState, createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const hasToken = document.cookie.includes("token="); // Or check a flag in localStorage

    if (!hasToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
