import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("nmk_user_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nmk_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Keep token synced
  useEffect(() => {
    if (token) {
      localStorage.setItem("nmk_user_token", token);
    } else {
      localStorage.removeItem("nmk_user_token");
    }
  }, [token]);

  // Keep user synced
  useEffect(() => {
    if (user) {
      localStorage.setItem("nmk_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("nmk_user");
    }
  }, [user]);

  // Listen to login updates triggered by Login.jsx
  useEffect(() => {
    function syncUser() {
      const savedUser = localStorage.getItem("nmk_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);

      const savedToken = localStorage.getItem("nmk_user_token");
      setToken(savedToken || null);
    }

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("nmk_user");
    localStorage.removeItem("nmk_user_token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
