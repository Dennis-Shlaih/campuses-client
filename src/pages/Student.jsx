//This page displays a list of students with some dummy data. Each student has a link to their own page.
import { Link, useParams } from "react-router-dom";

function Student() {
  const { id } = useParams();

  const student = {
    id,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    imageUrl: "https://placehold.co/150x150?text=AJ",
    gpa: 3.8,
    campus: "Hunter College",
  };

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <img
        src={student.imageUrl}
        alt={`${student.firstName} ${student.lastName}`}
        className="w-32 h-32 rounded object-cover mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">
        {student.firstName} {student.lastName}
      </h1>

      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
      <p>Campus: {student.campus ? student.campus : "Not enrolled"}</p>

      <div className="mt-6 flex gap-4">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Edit Student
        </button>

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Delete Student
        </button>

        <Link to="/students" className="text-blue-600 hover:underline">
          Back to Students
        </Link>
      </div>
    </section>
  );
}

export default Student;