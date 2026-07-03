//populated some dummy data for students and displays them in a list. Each student has a link to their own page. 
import { Link } from "react-router-dom";

function Students() {
  const students = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      imageUrl: "https://placehold.co/150x150?text=AJ",
      gpa: 3.8,
      campus: "Hunter College",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      imageUrl: "https://placehold.co/150x150?text=BS",
      gpa: 3.2,
      campus: "Hunter College",
    },
    {
      id: 3,
      firstName: "Eva",
      lastName: "Martinez",
      email: "eva.martinez@example.com",
      imageUrl: "https://placehold.co/150x150?text=EM",
      gpa: 3.95,
      campus: null,
    },
  ];

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Students</h1>
        <Link
          to="/students/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded shadow flex gap-4">
            <img
              src={student.imageUrl}
              alt={`${student.firstName} ${student.lastName}`}
              className="w-24 h-24 rounded object-cover"
            />

            <div>
              <h2 className="text-xl font-semibold">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-gray-600">{student.email}</p>
              <p>GPA: {student.gpa}</p>
              <p>{student.campus ? student.campus : "Not enrolled"}</p>

              <Link
                to={`/students/${student.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Students;