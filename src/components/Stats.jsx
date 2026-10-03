function Stats({ employees }) {
  const departments = new Set(
    employees.map(
      (employee) => employee.department
    )
  ).size;

  const roles = new Set(
    employees.map(
      (employee) => employee.role
    )
  ).size;

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">👥</div>

        <div>
          <span>Total employees</span>
          <strong>{employees.length}</strong>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⌂</div>

        <div>
          <span>Departments</span>
          <strong>{departments}</strong>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">↗</div>

        <div>
          <span>Roles</span>
          <strong>{roles}</strong>
        </div>
      </div>
    </section>
  );
}

export default Stats;