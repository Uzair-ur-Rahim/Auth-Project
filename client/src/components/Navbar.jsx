import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/register" className="nav-item">Register</Link>
        <Link to="/login" className="nav-item">Login</Link>
      </nav>
    </div>
  );
}
