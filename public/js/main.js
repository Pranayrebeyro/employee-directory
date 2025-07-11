let employees = [];
let perPage = 10;
let currentPage = 1;

if (localStorage.getItem("employees")) {
  employees = JSON.parse(localStorage.getItem("employees"));
  render();
} else {
  fetch("data/employees.json")
    .then((res) => res.json())
    .then((data) => {
      employees = data;
      localStorage.setItem("employees", JSON.stringify(employees));
      render();
    });
}

function render(list = employees) {
  const container = document.getElementById("dashboardContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const pageData = list.slice(start, start + perPage);

  pageData.forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="edit(${emp.id})">Edit</button>
      <button onclick="remove(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  renderPagination(list);
}

function renderPagination(list) {
  const container = document.getElementById("dashboardContainer");
  const totalPages = Math.ceil(list.length / perPage);
  let pagination = '<div class="pagination">';
  for (let i = 1; i <= totalPages; i++) {
    pagination += `<button onclick="page(${i})">${i}</button>`;
  }
  pagination += "</div>";
  container.innerHTML += pagination;
}

function page(num) {
  currentPage = num;
  applyFiltersAndRender();
}

function remove(id) {
  if (confirm("Delete this employee?")) {
    employees = employees.filter((e) => e.id !== id);
    localStorage.setItem("employees", JSON.stringify(employees));
    applyFiltersAndRender();
  }
}

function edit(id) {
  const emp = employees.find((e) => e.id === id);
  fetch("templates/form.ftl")
    .then((r) => r.text())
    .then((html) => {
      document.body.innerHTML = html;
      Object.entries(emp).forEach(([k, v]) => {
        const el = document.getElementById(k);
        if (el) el.value = v;
      });
      bindForm();
    });
}

function addNew() {
  fetch("templates/form.ftl")
    .then((r) => r.text())
    .then((html) => {
      document.body.innerHTML = html;
      bindForm();
    });
}

function bindForm() {
  document.getElementById("employeeForm").onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("employeeId").value;
    const newEmp = {
      id: id ? +id : Date.now(),
      firstName: getVal("firstName"),
      lastName: getVal("lastName"),
      email: getVal("email"),
      department: getVal("department"),
      role: getVal("role"),
    };

    if (!/^\S+@\S+\.\S+$/.test(newEmp.email)) {
      alert("Invalid email");
      return;
    }

    employees = id
      ? employees.map((e) => (e.id === +id ? newEmp : e))
      : [...employees, newEmp];

    localStorage.setItem("employees", JSON.stringify(employees));
    location.reload();
  };
}

function getVal(id) {
  return document.getElementById(id).value.trim();
}

function search() {
  applyFiltersAndRender();
}

function sortEmployees() {
  applyFiltersAndRender();
}

function filterEmployees() {
  applyFiltersAndRender();
}

function changePerPage() {
  perPage = +document.getElementById("perPageSelect").value;
  currentPage = 1;
  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  let filtered = [...employees];

  const term =
    document.getElementById("searchInput")?.value.toLowerCase() || "";
  if (term) {
    filtered = filtered.filter(
      (e) =>
        e.firstName.toLowerCase().includes(term) ||
        e.lastName.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term)
    );
  }

  const dept = document.getElementById("filterDepartment")?.value || "";
  if (dept) filtered = filtered.filter((e) => e.department === dept);

  const role = document.getElementById("filterRole")?.value || "";
  if (role) filtered = filtered.filter((e) => e.role === role);

  const sortField = document.getElementById("sortSelect")?.value || "";
  if (sortField) {
    filtered.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  }

  render(filtered);
}
