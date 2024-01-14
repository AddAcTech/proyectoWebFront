import React, { useEffect, useState } from "react";

function AdminView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const fecthAwarded = async () => {
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      };
      fecthAwarded();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUserDelete = async (e) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${e}`, {
        method: "DELETE",
      });
      const data = await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-2">
      <h1 className="text-black font-bold text-2xl mt-6 text-center">
        LISTA DE GALARDONADOS
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {users.map((user) => (
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

export default AdminView;
