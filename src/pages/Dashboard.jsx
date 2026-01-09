import { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); // For modal
  const usersPerPage = 4;

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.log("Dashboard fetch error:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filter users by search input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.address.city.toLowerCase().includes(search.toLowerCase())
  );

  // Sort filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === "city") return a.address.city.localeCompare(b.address.city);
    return a[sortField].localeCompare(b[sortField]);
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f0f4f8" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ color: "#2c3e50" }}>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Search + Sort */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by name, email, or city..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="city">City</option>
        </select>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error + Retry */}
      {error && (
        <div style={{ marginBottom: "20px" }}>
          <ErrorMessage message={error} />
          <button
            onClick={fetchUsers}
            style={{
              padding: "10px 15px",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Users Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {currentUsers.map((user, index) => (
          <div
            key={user.id}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
              color: "#2c3e50",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s, opacity 0.5s, transform 0.5s",
              opacity: 0,
              transform: "translateY(20px)",
              cursor: "pointer",
            }}
            onClick={() => setSelectedUser(user)}
            ref={(el) => {
              if (el) setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = "translateY(0)";
              }, index * 100);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}>
              {user.name}
            </h3>
            <p style={{ marginBottom: "6px" }}>📧 {user.email}</p>
            <p style={{ marginBottom: "6px" }}>🏙 {user.address.city}</p>
            <p>🏢 {user.company.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ marginRight: "10px", padding: "8px 12px", borderRadius: "6px" }}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ marginLeft: "10px", padding: "8px 12px", borderRadius: "6px" }}
          >
            Next
          </button>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>{selectedUser.name}</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>City:</strong> {selectedUser.address.city}</p>
            <p><strong>Street:</strong> {selectedUser.address.street}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Company:</strong> {selectedUser.company.name}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <button
              onClick={() => setSelectedUser(null)}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
 >

              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
