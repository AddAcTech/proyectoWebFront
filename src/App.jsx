import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminView from "./components/AdminView";
import User from "./components/User";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
