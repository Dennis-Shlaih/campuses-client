//this page is a form of add student. 
import { useState } from "react";

function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: "",
    campusId: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("First name, last name, and email are required.");
      return;
    }

    if (Number(formData.gpa) < 0 || Number(formData.gpa) > 4) {
      alert("GPA must be between 0.0 and 4.0.");
      return;
    }

    console.log("Student submitted:", formData);
    alert("Student form works. Backend connection will be added later.");
  }

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="gpa"
          type="number"
          step="0.1"
          min="0"
          max="4"
          placeholder="GPA"
          value={formData.gpa}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="campusId"
          value={formData.campusId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Not enrolled</option>
          <option value="1">Hunter College</option>
          <option value="2">Brooklyn College</option>
          <option value="3">Queens College</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Student
        </button>
      </form>
    </section>
  );
}

export default AddStudent;