function Header({ onAddEmployee }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">ED</div>

        <div>
          <h1>Employee Directory</h1>
          <p>Keep your team information organized.</p>
        </div>
      </div>

      <button
        className="primary-btn"
        onClick={onAddEmployee}
      >
        <span>+</span>
        Add employee
      </button>
    </header>
  );
}

export default Header;