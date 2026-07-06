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
      <NavLink to="/campuses" className={linkStyle}>Campuses</NavLink> {/*here under the nav bar entire block we have multiple links each link just taking you to the page where it is found for campuses it is taking you to the campuses page and below it it is taking your to the add campuses page with the help of the React router imported NavLink property which allows us to change the styling of the link once you actually are actively on the page. */}
      <NavLink to="/campuses/add" className={linkStyle}>Add Campus</NavLink>
    </nav>
  );
}

export default Navbar;