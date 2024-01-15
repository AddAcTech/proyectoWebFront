import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import { Document, PDFDownloadLink } from "@react-pdf/renderer";
import InvitationPage from "./InvitationPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function UserForm() {
  const { token } = useContext(AuthContext);
  const [newInfo, setNewInfo] = useState({
    attendance_status: 0,
    guest: 0,
    physical_condition: "",
    pdf_invitation: "",
  });
  const [userInfo, setUserInfo] = useState(null);

  const handleChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarInfo = async (e) => {
    e.preventDefault();

    // Actualizar pdf_invitation en el estado antes de la solicitud
    setNewInfo((prevInfo) => ({
      ...prevInfo,
      pdf_invitation: "generated",
    }));

    try {
      const response = await fetch(
        `http://localhost:8000/api/profile/${userInfo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newInfo),
        }
      );
      const data = await response.json();
      toast("Informacion actualizada en la base de datos");

      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
        //console.log(data);
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

  const MyDocument = () => (
    <Document>
      {Array.from({ length: newInfo.guest }, (_, i) => (
        <InvitationPage
          key={i}
          guestNumber={i + 1}
          name={userInfo.name}
          id={userInfo.id}
          award={userInfo.award}
          event_location={userInfo.event_location}
        />
      ))}
    </Document>
  );

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-black font-bold text-2xl my-2">
        Introduzca sus datos
      </h1>
      <form className="shadow-lg p-6 rounded flex flex-col gap-2 border border-black">
        <div className="flex gap-2">
          <label>Asistencia</label>
          <select
            className="border border-black"
            name="attendance_status"
            onChange={handleChange}
          >
            <option value="0">No Asistire</option>
            <option value="1">Asistire</option>
          </select>
        </div>
        <div className="flex gap-2 justify-between">
          <label>Numero de acompañantes</label>
          <input
            type="number"
            className="border border-black"
            min={0}
            max={10}
            name="guest"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 justify-between">
          <label>Condicion fisica</label>
          <select
            className="border border-black"
            name="physical_condition"
            onChange={handleChange}
          >
            <option value="Ninguno">Ninguno</option>
            <option value="Necesito apoyo">Necesito apoyo</option>
          </select>
        </div>
        <div className="flex gap-2 justify-between">
          <label>Implemento</label>
          <select className="border border-black" onChange={handleChange}>
            <option value="Ninguno">Ninguno</option>
            <option value="Baston">Baston</option>
            <option value="Muletas">Muletas</option>
            <option value="Silla de Ruedas">Silla de Ruedas</option>
          </select>
        </div>
        <button
          className="bg-black text-white font-medium rounded px-4 mt-2"
          onClick={actualizarInfo}
        >
          Generar invitacion
        </button>
        <PDFDownloadLink
          document={<MyDocument />}
          fileName="invitaciones.pdf"
          className="bg-black text-white font-medium rounded px-4 mt-2 text-center"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Cargando documento..." : "Descargar documento"
          }
        </PDFDownloadLink>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UserForm;
