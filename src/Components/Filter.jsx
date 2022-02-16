import React from "react";

export const Filter = ({ dep, setDep }) => {
  return (
    <>
      <div>Filter</div>
      <form>
        <select onChange={(e) => setDep(e.currentTarget.value)}>
          <option>All</option>
          <option value="HR">HR</option>
          <option value="marketing">Marketing</option>
        </select>
      </form>
    </>
  );
};
