import "./App.css";
import { Form } from "./Components/Form";
import React from "react";
import { Table } from "./Components/Table";
import { Filter } from "./Components/Filter";
import { Sort } from "./Components/Sort";
import { Pagination } from "./Components/Pagination";
function App() {
  const [list, setList] = React.useState([]);
  const [dep, setDep] = React.useState("All");
  const [ascDec, setAscDec] = React.useState("none");
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    fetch(
      `http://localhost:3000/post?_page=${page}&_limit=5${
        dep === "All" ? "" : `&department=${dep}`
      }${ascDec === "none" ? "" : `&_sort=salary&_order=${ascDec}`}`
    )
      .then((res) => {
        setCount(res.headers.get("X-Total-Count"));
        return res.json();
      })
      .then((res) => setList([...res]));
  }, [dep, ascDec, page]);
  const onDel = (item) => {
    fetch(`http://localhost:3000/post/${item.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        fetch(
          `http://localhost:3000/post?_page=${page}&_limit=5${
            dep === "All" ? "" : `&department=${dep}`
          }${ascDec === "none" ? "" : `&_sort=salary&_order=${ascDec}`}`
        )
          .then((res) => {
            setCount(res.headers.get("X-Total-Count"));
            return res.json();
          })
          .then((res) => setList([...res]));
      });
  };
  return (
    <div className="App">
      <Form
        list={list}
        setList={setList}
        page={page}
        ascDec={ascDec}
        dep={dep}
        setCount={setCount}
      />
      <Filter dep={dep} setDep={setDep} />
      <Sort setAscDec={setAscDec} />
      <Table
        list={list}
        setList={setList}
        ascDec={ascDec}
        page={page}
        dep={dep}
        onDel={onDel}
      />
      <Pagination page={page} setPage={setPage} count={count} />
    </div>
  );
}
export default App;
