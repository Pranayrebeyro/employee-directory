function Toolbar({
  search,
  setSearch,
  department,
  setDepartment,
  role,
  setRole,
  sortBy,
  setSortBy,
  perPage,
  setPerPage,
  departments,
  roles
}) {
  return (
    <section className="toolbar">
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      <select
        value={department}
        onChange={(event) =>
          setDepartment(event.target.value)
        }
      >
        <option value="">
          All departments
        </option>

        {departments.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={role}
        onChange={(event) =>
          setRole(event.target.value)
        }
      >
        <option value="">
          All roles
        </option>

        {roles.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value)
        }
      >
        <option value="">
          Sort by
        </option>

        <option value="firstName">
          Name
        </option>

        <option value="department">
          Department
        </option>

        <option value="role">
          Role
        </option>
      </select>

      <select
        value={perPage}
        onChange={(event) =>
          setPerPage(Number(event.target.value))
        }
      >
        <option value={6}>
          6 / page
        </option>

        <option value={10}>
          10 / page
        </option>

        <option value={20}>
          20 / page
        </option>
      </select>
    </section>
  );
}

export default Toolbar;