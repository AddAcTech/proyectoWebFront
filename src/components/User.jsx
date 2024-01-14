import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function User() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    //console.log(token);
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (!userInfo) {
    return (
      <div className="h-screen flex font-bold text-3xl items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center gap-2">
      <div className="shadow-lg p-6 rounded">
        <div className="grid gap-1 text-center">
          <h1 className="text-xl text-black font-medium">
            Bienvenido {userInfo.name}!
          </h1>
          <h2 className="text-xs">Su informacion</h2>
        </div>
        <div className="p-0 grid gap-2">
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Nombre:</span>
            {userInfo.name}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">CURP:</span>
            {userInfo.CURP}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Asistencia:</span>
            {userInfo.attendance_status}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Presea:</span>
            {userInfo.award}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Categoria:</span>
            {userInfo.category}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Ubicacion:</span>
            {userInfo.event_location}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Invitados</span>
            {userInfo.guest}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className="font-bold">Condicion fisica:</span>
            {userInfo.physical_condition}
          </p>
          <button
            className="bg-black text-white font-medium  rounded max-w-fit px-4 mx-auto my-2"
            onClick={() => navigate("/userForm")}
          >
            Confirmar asistencia
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
