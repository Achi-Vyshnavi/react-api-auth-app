const Loader = () => (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto",
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader;
