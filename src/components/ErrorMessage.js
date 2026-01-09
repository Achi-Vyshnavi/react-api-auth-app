const ErrorMessage = ({ message }) => (
  <div
    style={{
      backgroundColor: "#ffe6e6",
      color: "#e74c3c",
      padding: "10px",
      borderRadius: "6px",
      fontWeight: "bold",
    }}
  >
    {message}
  </div>
);

export default ErrorMessage;
