import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Stats from "./components/Stats";
import Toolbar from "./components/Toolbar";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeModal from "./components/EmployeeModal";
import Pagination from "./components/Pagination";

import { initialEmployees } from "./data/employees";

function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees =
      localStorage.getItem("employees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : initialEmployees;
  });

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [perPage, setPerPage] = useState(6);

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState(null);

  /* Save employees */

  useEffect(() => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees]);

  /* Department options */

  const departments = useMemo(() => {
    return [
      ...new Set(
        employees.map(
          (employee) => employee.department
        )
      )
    ].sort();
  }, [employees]);

  /* Role options */

  const roles = useMemo(() => {
    return [
      ...new Set(
        employees.map(
          (employee) => employee.role
        )
      )
    ].sort();
  }, [employees]);

  /* Search, filter and sort */

  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    const searchTerm =
      search.trim().toLowerCase();

    if (searchTerm) {
      result = result.filter((employee) => {
        const fullName =
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase();

        return (
          fullName.includes(searchTerm) ||
          employee.email
            .toLowerCase()
            .includes(searchTerm) ||
          employee.department
            .toLowerCase()
            .includes(searchTerm) ||
          employee.role
            .toLowerCase()
            .includes(searchTerm)
        );
      });
    }

    if (department) {
      result = result.filter(
        (employee) =>
          employee.department === department
      );
    }

    if (role) {
      result = result.filter(
        (employee) =>
          employee.role === role
      );
    }

    if (sortBy) {
      result.sort((a, b) =>
        a[sortBy].localeCompare(b[sortBy])
      );
    }

    return result;
  }, [
    employees,
    search,
    department,
    role,
    sortBy
  ]);

  /* Pagination */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEmployees.length / perPage
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleEmployees =
    filteredEmployees.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

  /* Modal */

  function openAddModal() {
    setEditingEmployee(null);
    setModalOpen(true);
  }

  function openEditModal(employee) {
    setEditingEmployee(employee);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingEmployee(null);
  }

  /* Add / Edit */

  function saveEmployee(employee) {
    if (employee.id) {
      setEmployees((current) =>
        current.map((item) =>
          item.id === employee.id
            ? employee
            : item
        )
      );
    } else {
      const newId =
        employees.length > 0
          ? Math.max(
              ...employees.map(
                (item) => item.id
              )
            ) + 1
          : 1;

      const newEmployee = {
        ...employee,
        id: newId
      };

      setEmployees((current) => [
        ...current,
        newEmployee
      ]);
    }

    closeModal();
    setCurrentPage(1);
  }

  /* Delete */

  function deleteEmployee(id) {
    const employee = employees.find(
      (item) => item.id === id
    );

    if (!employee) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    setEmployees((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  /* Reset page when filters change */

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleDepartmentChange(value) {
    setDepartment(value);
    setCurrentPage(1);
  }

  function handleRoleChange(value) {
    setRole(value);
    setCurrentPage(1);
  }

  function handleSortChange(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handlePerPageChange(value) {
    setPerPage(value);
    setCurrentPage(1);
  }

  return (
    <div className="app">
      <Header
        onAddEmployee={openAddModal}
      />

      <main className="container">
        <Stats employees={employees} />

        <section className="directory-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                Team
              </span>

              <h2>All employees</h2>

              <p>
                Browse and manage your employee
                information.
              </p>
            </div>

            <span className="result-count">
              {filteredEmployees.length}{" "}
              {filteredEmployees.length === 1
                ? "employee"
                : "employees"}
            </span>
          </div>

          <Toolbar
            search={search}
            setSearch={handleSearchChange}
            department={department}
            setDepartment={
              handleDepartmentChange
            }
            role={role}
            setRole={handleRoleChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
            perPage={perPage}
            setPerPage={handlePerPageChange}
            departments={departments}
            roles={roles}
          />

          {visibleEmployees.length > 0 ? (
            <div className="employee-grid">
              {visibleEmployees.map(
                (employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onEdit={openEditModal}
                    onDelete={deleteEmployee}
                  />
                )
              )}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                —
              </div>

              <h3>
                No employees found
              </h3>

              <p>
                Try changing your search or
                filter options.
              </p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>

      {modalOpen && (
        <EmployeeModal
          employee={editingEmployee}
          onClose={closeModal}
          onSave={saveEmployee}
        />
      )}
    </div>
  );
}

export default App;