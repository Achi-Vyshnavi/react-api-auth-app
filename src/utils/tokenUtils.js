// Save token with expiry (1 hour)
export const setToken = (token) => {
  const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", expiryTime);
};

// Get token and check expiry
export const getToken = () => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry) return null;

  if (new Date().getTime() > Number(expiry)) {
    clearToken();
    return null;
  }

  return token;
};

// Clear token on logout or expiry
export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};
