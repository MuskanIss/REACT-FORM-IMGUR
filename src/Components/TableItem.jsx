import React from "react";

export const TableItem = ({ item, setList, dep, ascDec, page, onDel }) => {
  return (
    <>
      <tr>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.address}</td>
        <td>{item.department}</td>
        <td>{item.salary}</td>
        <td>{item.maritalStatus ? "Yes" : "No"}</td>
        <td>
          <img src={item.photo} alt="img" />
        </td>
        <td>
          <button onClick={() => onDel(item)}>Delete</button>
        </td>
      </tr>
    </>
  );
};
