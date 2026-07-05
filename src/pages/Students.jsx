//populated some dummy data for students and displays them in a list. Each student has a link to their own page. 
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../api/students";
import useUiStore from "../store/useUiStore";

function Students() {
  const { showUnenrolledOnly, toggleUnenrolledOnly } = useUiStore();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isLoading) return <p className="text-center">Loading students...</p>;

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Error loading students: {error.message}
      </p>
    );
  }

  const filteredStudents = showUnenrolledOnly
    ? data.filter((student) => !student.campusId && !student.campus)
    : data;

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">All Students</h1>

        <div className="flex gap-3">
          <button
            onClick={toggleUnenrolledOnly}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            {showUnenrolledOnly ? "Show All" : "Show Unenrolled Only"}
          </button>

          <Link
            to="/students/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Student
          </Link>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredStudents.map((student) => (
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
                <p>
                  Campus:{" "}
                  {student.campus?.name || "Not enrolled"}
                </p>

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
      )}
    </section>
  );
}

export default Students;