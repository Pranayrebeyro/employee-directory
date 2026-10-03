function EmployeeCard({
  employee,
  onEdit,
  onDelete
}) {
  const initials =
    `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`
      .toUpperCase();

  return (
    <article className="employee-card">
      <div className="employee-top">
        <div className="avatar">
          {initials}
        </div>

        <div className="employee-heading">
          <h3>
            {employee.firstName}{" "}
            {employee.lastName}
          </h3>

          <p>{employee.role}</p>
        </div>

        <span className="employee-id">
          #{employee.id}
        </span>
      </div>

      <div className="employee-details">
        <div className="detail-row">
          <span className="detail-label">
            Email
          </span>

          <span className="detail-value email">
            {employee.email}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">
            Department
          </span>

          <span className="department-badge">
            {employee.department}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">
            Role
          </span>

          <span className="detail-value">
            {employee.role}
          </span>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default EmployeeCard;