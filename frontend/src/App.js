import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import BookForm from "./BookForm";
import BookList from "./BookList";
import Login from "./Login";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState(null);

  const [stats, setStats] = useState({
    totalBooks: 0,
    revenue: 0
  });

  useEffect(() => {
    const logged = localStorage.getItem("login");
    if (logged === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("login");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="bg-light min-vh-100">

      {/* HEADER */}
      <div className="bg-dark text-white p-3 d-flex justify-content-between">
        <h4> Bookstore Dashboard</h4>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container mt-4">

        {/* 🔥 STATS CARDS */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card text-white bg-primary p-3 shadow">
              <h5>Total Books</h5>
              <h2>{stats.totalBooks}</h2>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-white bg-success p-3 shadow">
              <h5>Total Revenue</h5>
              <h2>₹{stats.revenue}</h2>
            </div>
          </div>

        </div>

        {/* MAIN */}
        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-md-4">

            <BookForm
              reload={() => setRefresh(!refresh)}
              editData={editData}
              clearEdit={() => setEditData(null)}
            />

            {/* 📊 CHARTS BELOW ADD BOOK */}
            <div className="mt-4">
              <Dashboard />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-8">
            <BookList
              refresh={refresh}
              onEdit={(book) => setEditData(book)}
              setStats={setStats}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;