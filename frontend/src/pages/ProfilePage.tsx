import React, { useState, useEffect } from "react";

interface details {
  name: string;
  course: string;
  gpa: number;
  minAward: string;
}

const ProfilePage = () => {
  const [form, setForm] = useState<details>({
    name: "",
    course: "",
    gpa: 0,
    minAward: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const temp = localStorage.getItem("profile");
    if (temp) {
      setForm(JSON.parse(temp) as details);
    }
  }, []);

  const handleUpdate = () => {
    setEditMode(true);
  };

  if (!editMode) {
    return (
      <div className="container mt-4">
        <h3>Your Credentials:</h3>
        <p>
          <strong>Name:</strong> {form.name}
        </p>
        <p>
          <strong>Course:</strong> {form.course}
        </p>
        <p>
          <strong>GPA:</strong> {form.gpa}
        </p>
        <p>
          <strong>Minimum Award:</strong> {form.minAward}
        </p>
        <strong>
          To update click this button:{" "}
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleUpdate}
          >
            UPDATE
          </button>
        </strong>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "gpa" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(form));
    alert("Profile saved!");
    setEditMode(false);
  };

  return (
    <div className="container mt-5">
      <h3>Create Profile</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <input
            className="form-control"
            name="course"
            value={form.course}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GPA</label>
          <input
            className="form-control"
            name="gpa"
            value={form.gpa}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Minimum Award Needed</label>
          <input
            className="form-control"
            name="minAward"
            value={form.minAward}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
