//file for editing a student. fetches data from the backend and allows the user to edit students information. 
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudent, updateStudent } from "../api/students";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: "",
    campusId: "",
  });

  const { data: student, isLoading, isError, error } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id),
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        imageUrl: student.imageUrl || "",
        gpa: student.gpa || "",
        campusId: student.campusId || "",
      });
    }
  }, [student]);

  const mutation = useMutation({
    mutationFn: (updatedStudent) => updateStudent(id, updatedStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", id] });
      navigate(`/students/${id}`);
    },
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const gpa = Number(formData.gpa);
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("First name, last name, and email are required.");
      return;
    }

    if (Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
      alert("GPA must be between 0.0 and 4.0.");
      return;
    }

    mutation.mutate({
      ...formData,
      gpa,
      campusId: formData.campusId ? Number(formData.campusId) : null,
    });
  }

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
      <h1 className="text-3xl font-bold mb-6">Edit Student</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="border p-2 rounded" />
        <input name="gpa" type="number" step="0.1" min="0" max="4" placeholder="GPA" value={formData.gpa} onChange={handleChange} className="border p-2 rounded" />

        <select name="campusId" value={formData.campusId} onChange={handleChange} className="border p-2 rounded">
          <option value="">Not enrolled</option>
          <option value="1">Hunter College</option>
          <option value="2">Brooklyn College</option>
          <option value="3">Queens College</option>
        </select>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>

        {mutation.isError && (
          <p className="text-red-600">Error: {mutation.error.message}</p>
        )}
      </form>
    </section>
  );
}

export default EditStudent;