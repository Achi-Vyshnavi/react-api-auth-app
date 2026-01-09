import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ ADD (NEW)
  const [isExpired, setIsExpired] = useState(false);

  const EXPIRY = 10 * 60 * 1000; // 10 minutes

  // ✅ EXISTING (unchanged)
  useEffect(() => {
    const storedTime = localStorage.getItem("tokenTime");
    if (storedTime) {
      const now = Date.now();
      const diff = now - parseInt(storedTime, 10);
      if (diff > EXPIRY) logout();
    }
  }, []);

  // ✅ ADD (NEW – auto expiry watcher)
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      const tokenTime = localStorage.getItem("tokenTime");
      if (!tokenTime) {
        logout();
        return;
      }

      const diff = Date.now() - parseInt(tokenTime, 10);
      if (diff >= EXPIRY) {
        setIsExpired(true);
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  // ✅ EXISTING (unchanged, only added one line)
  const login = (newToken) => {
    setToken(newToken);
    setIsExpired(false); // ✅ ADD
    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenTime", Date.now().toString());
  };

  // ✅ EXISTING (unchanged, only added one line)
  const logout = () => {
    setToken(null);
    setIsExpired(true); // ✅ ADD
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);









