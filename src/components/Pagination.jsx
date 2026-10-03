function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        Previous
      </button>

      <div className="page-numbers">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            className={
              page === currentPage
                ? "active"
                : ""
            }
            onClick={() =>
              onPageChange(page)
            }
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;