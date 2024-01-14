import React, { useEffect, useState } from "react";

function AdminViewAsistiran() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fecthAwarded = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/present");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fecthAwarded();
  }, []);

  const handleUserDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = filter
    ? users.filter((user) => user.award === filter)
    : users;

  return (
    <div className="flex flex-col justify-center gap-2">
      <h1 className="text-black font-bold text-2xl mt-6 text-center">
        CONFIRMADOS DE ASISTENCIA
      </h1>
      <div className="flex gap-2 mx-auto">
        <label>Filtrar por:</label>
        <select className="border" onChange={handleFilter}>
          <option value="">Todos</option>
          <option value="Best Director">Diploma Eficiencia Y Eficacia</option>
          <option value="Best Writer">Presea Juan de Dios Batiz</option>
          <option value="Best Actress">Presea Carlos Vallejo Márquez</option>
        </select>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col border shadow-lg p-4 rounded"
          >
            <li className="font-bold text-center">{user.name}</li>
            <li>{user.CURP}</li>
            <li>{user.award}</li>
            <button
              className="bg-black text-white font-medium  rounded max-w-fit px-4 mx-auto my-2"
              onClick={() => handleUserDelete(user.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AdminViewAsistiran;
