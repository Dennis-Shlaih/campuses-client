//this page is a form of add student. 
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../api/students";

function AddStudent() {
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

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validateForm() {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("First name, last name, and email are required.");
      return false;
    }

    const gpa = Number(formData.gpa);
    if (Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
      alert("GPA must be between 0.0 and 4.0.");
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    mutation.mutate({
      ...formData,
      gpa: Number(formData.gpa),
      campusId: formData.campusId ? Number(formData.campusId) : null,
      imageUrl:
        formData.imageUrl || "https://placehold.co/150x150?text=Student",
    });
  }

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>

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

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {mutation.isPending ? "Adding..." : "Add Student"}
        </button>

        {mutation.isError && (
          <p className="text-red-600">Error: {mutation.error.message}</p>
        )}
      </form>
    </section>
  );
}

export default AddStudent;