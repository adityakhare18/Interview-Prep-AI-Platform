import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import UserProvider, { UserContext } from "./context/userContext";
import SpinnerLoader from "./components/Loader/SpinnerLoader";

const AppRoutes = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route
          path="interview-prep/:sessionId"
          element={user ? <InterviewPrep /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <AppRoutes />
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
