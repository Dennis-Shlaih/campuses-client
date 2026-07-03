//basic navigation bar that uses react router to navigate between the different pages of the app. 
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold underline"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow p-4 flex gap-6">
      <NavLink to="/" className={linkStyle}>Home</NavLink>
      <NavLink to="/students" className={linkStyle}>Students</NavLink>
      <NavLink to="/students/add" className={linkStyle}>Add Student</NavLink>
    </nav>
  );
}

export default Navbar;