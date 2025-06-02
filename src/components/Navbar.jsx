import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">FluentFlow</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/game" className="hover:text-blue-500">Games</Link>
            <Link to="/tips">Tips & Tricks </Link>

            <button 
              onClick={handleLogout}
              className="hover:text-blue-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-blue-500">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;