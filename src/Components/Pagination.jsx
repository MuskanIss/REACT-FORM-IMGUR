import React from "react";

export const Pagination = ({ page, setPage, count }) => {
  return (
    <>
      <button
        disabled={page === 1 ? true : false}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <button
        disabled={page >= count / 5 ? true : false}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </>
  );
};
