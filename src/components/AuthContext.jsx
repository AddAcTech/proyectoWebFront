import React, { useState } from "react";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
