import { useEffect, useState } from "react";

function EmployeeModal({
  employee,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setForm({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        department: employee.department,
        role: employee.role
      });
    } else {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        role: ""
      });
    }

    setError("");
  }, [employee]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.department.trim() ||
      !form.role.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onSave({
      ...form,
      id: employee?.id
    });
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <span className="modal-kicker">
              Employee details
            </span>

            <h2>
              {employee
                ? "Edit employee"
                : "Add employee"}
            </h2>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              First name

              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Alice"
              />
            </label>

            <label>
              Last name

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Smith"
              />
            </label>

            <label className="full-width">
              Email

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alice@example.com"
              />
            </label>

            <label>
              Department

              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Engineering"
              />
            </label>

            <label>
              Role

              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Frontend Developer"
              />
            </label>
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
            >
              {employee
                ? "Save changes"
                : "Add employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;