import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Login() {
  const [CURP, setCURP] = useState("");
  const { updateToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CURP }),
      });
      const data = await response.json();
      if (response.status === 200) {
        updateToken(data.token); // Set the token globally
        navigate("/user");
      } else if (data.message === "CURP incorrecto") {
        alert("CURP no encontrada");
        setCURP(""); // Limpia el campo de entrada
      }
      //console.log(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <h1 className="font-bold text-2xl text-center mb-2">INICIAR SESION</h1>
      <form className="shadow-lg flex flex-col gap-2 p-4 rounded border border-sl">
        <div className="flex gap-2 items-center">
          <label className="font-bold">Ingrese su CURP</label>
          <input
            type="text"
            className="border border-slate-950 p-2 rounded-sm text-black"
            placeholder="HEQI681224MDFRRR03"
            max={18}
            min={18}
            onChange={(e) => setCURP(e.target.value)}
          />
        </div>
        <button
          className="bg-black p-2 text-white font-medium rounded-sm"
          onClick={handleSubmit}
        >
          Ingresar
        </button>
        <button
          className="bg-black p-2 text-white font-medium rounded-sm"
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>
      </form>
    </div>
  );
}

export default Login;
