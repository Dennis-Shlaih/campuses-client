//this page is the home page of the app. Displays a welcome and brief description. 
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Campuses & Students</h1>
      <p className="mb-6 text-gray-700">
        Fullstack CRUD app for managing students and campuses.
      </p>

      <Link to="/students" className="text-blue-600 hover:underline">
        View Students
      </Link>
    </section>
  );
}

export default Home;