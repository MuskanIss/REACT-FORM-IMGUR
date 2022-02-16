import React from "react";
import { v4 as uuid } from "uuid";

export const Form = function ({ setList, dep, ascDec, page, setCount }) {
  const [formData, setFormData] = React.useState({});
  var fileRef = React.useRef();
  const handle = (e) => {
    let name = e.currentTarget.name;
    if (name === "photo") {
      let formdata = new FormData();
      formdata.append("image", fileRef.current.files[0]);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID cfb2e541129672c");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch("https://api.imgur.com/3/image", requestOptions)
        .then((response) => response.json())
        .then((result) => setFormData({ ...formData, photo: result.data.link }))
        .catch((error) => console.log("error", error));
      return;
    }
    let value =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormData({ ...formData, id: uuid() });
          fetch("http://localhost:3000/post", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          fetch(
            `http://localhost:3000/post?_page=${page}&_limit=5${
              dep === "All" ? "" : `&department=${dep}`
            }${ascDec === "none" ? "" : `&_sort=salary&_order=${ascDec}`}`
          )
            .then((res) => {
              setCount(res.headers.get("X-Total-Count"));
              return res.json();
            })
            .then((res) => setList(res));
        }}
      >
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => handle(e)}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={(e) => handle(e)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={(e) => handle(e)}
          />
        </div>
        <div>
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={(e) => handle(e)}
          >
            <option></option>
            <option value="HR">HR</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label>Salary</label>
          <input
            name="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => handle(e)}
          />
        </div>
        <div>
          <label>Marital Status</label>
          <input
            checked={formData.maritalStatus}
            type="checkbox"
            name="maritalStatus"
            onChange={(e) => handle(e)}
          />
        </div>
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            name="photo"
            ref={fileRef}
            onChange={(e) => handle(e)}
          />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    </>
  );
};
