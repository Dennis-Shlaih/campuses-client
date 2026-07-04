//This page displays a list of students with some dummy data. Each student has a link to their own page.
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, getStudent } from "../api/students";

function Student() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: student,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
  });

  if (isLoading) return <p className="text-center">Loading student...</p>;

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Error loading student: {error.message}
      </p>
    );
  }

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <img
        src={student.imageUrl || "https://placehold.co/150x150?text=Student"}
        alt={`${student.firstName} ${student.lastName}`}
        className="w-32 h-32 rounded object-cover mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">
        {student.firstName} {student.lastName}
      </h1>

      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
      <p>Campus: {student.campus?.name || student.campusName || "Not enrolled"}</p>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          to={`/students/${student.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit Student
        </Link>

        <button
          onClick={() => {
            if (confirm("Delete this student?")) {
              deleteMutation.mutate();
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
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