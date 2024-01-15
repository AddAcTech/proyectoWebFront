import React from "react";
import { useNavigate } from "react-router-dom";
function AdminMenu() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col gap-2 justify-center">
      <h1 className="font-bold text-2xl text-center mb-2">MENU DEL ADMIN</h1>
      <button
        className="bg-black p-2 text-white font-medium rounded"
        onClick={() => navigate("/admin")}
      >
        Todos los galardonados
      </button>
      <button
        className="bg-black p-2 text-white font-medium rounded"
        onClick={() => navigate("/asist")}
      >
        Filtrar galardonados
      </button>
      <button
        className="bg-black p-2 text-white font-medium rounded"
        onClick={() => navigate("/register")}
      >
        Registrar Usuario
      </button>
    </div>
  );
}

export default AdminMenu;
