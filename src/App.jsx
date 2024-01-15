import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Login from "./components/Login";
import AdminView from "./components/AdminView";
import User from "./components/User";
import UserForm from "./components/UserForm";
import AdminViewAsistiran from "./components/AdminViewAsistiran";
import Register from "./components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/asist" element={<AdminViewAsistiran />} />
            <Route path="/user" element={<User />} />
            <Route path="/userForm" element={<UserForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
