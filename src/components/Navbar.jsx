//basic navigation bar that uses react router to navigate between the different pages of the app. 
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>{" | "}
      <NavLink to="/students">Students</NavLink>{" | "}
      <NavLink to="/students/add">Add Student</NavLink>
    </nav>
  );
}

export default Navbar;