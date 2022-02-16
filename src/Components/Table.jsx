import React from "react";
import { TableItem } from "./TableItem";
import style from "styled-components";

const Tab = style.table`
margin-right:auto;
margin-left:auto;
text-align:center;
`;

export const Table = ({ list, setList, dep, ascDec, page, onDel }) => {
  //   console.log(list);
  return (
    <>
      <Tab>
        <tr>
          <td>Name</td>
          <td>Age</td>
          <td>Address</td>
          <td>Department</td>
          <td>Salary</td>
          <td>Maritial Status</td>
          <td>Profile Picture</td>
        </tr>
        {list.map((item) => {
          return (
            <TableItem
              key={item.id}
              dep={dep}
              ascDec={ascDec}
              page={page}
              item={item}
              setList={setList}
              onDel={onDel}
            />
          );
        })}
      </Tab>
    </>
  );
};
