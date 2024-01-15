import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    curp: "",
    name: "",
    award: "",
    event_location: "",
    category: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-2 justify-center">
      <h1 className="text-2xl font-bold text-center">Registrar Usuario</h1>
      <form className="flex flex-col gap-2 border shadow-lg p-4 rounded">
        <div className="flex justify-between gap-2">
          <label className="font-bold">CURP:</label>
          <input
            min={18}
            max={18}
            type="text"
            name="CURP"
            className="border"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label className="font-bold">Nombre:</label>
          <input
            type="text"
            name="name"
            className="border"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label className="font-bold">Presea:</label>
          <input
            type="text"
            name="award"
            className="border"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label className="font-bold">Ubicacion:</label>
          <input
            type="text"
            name="event_location"
            className="border"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label className="font-bold">Categoria:</label>
          <input
            type="text"
            name="category"
            className="border"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-black text-white font-medium rounded px-4 mt-2"
          onClick={handleRegister}
        >
          Dar de Alta
        </button>
      </form>
    </div>
  );
}

export default Register;
