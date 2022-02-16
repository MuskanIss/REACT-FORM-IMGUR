import React from "react";

export const Sort = ({ setAscDec }) => {
  return (
    <>
      <button onClick={() => setAscDec("asc")}>Ascending</button>
      <button onClick={() => setAscDec("desc")}>Descending</button>
    </>
  );
};
