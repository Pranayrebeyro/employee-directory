<#list employees as emp>
  <div class="employee-card" data-id="${emp.id}">
    <h3>${emp.firstName} ${emp.lastName}</h3>
    <p>Email: ${emp.email}</p>
    <p>Department: ${emp.department}</p>
    <p>Role: ${emp.role}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </div>
</#list>
