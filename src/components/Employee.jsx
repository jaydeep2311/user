import React from "react";
import { v4 as uuid } from "uuid";

function Employee() {
  const [name, setname] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [dept, setdept] = React.useState("");
  const [role, setrole] = React.useState("");
  const [salary, setsalary] = React.useState("");
  const [Employee, setEmployee] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    getEmployee();
  }, []);
  function getEmployee() {
    fetch("http://localhost:3001/Employee")
      .then((res) => res.json())
      .then((res) => setEmployee(res));
    return Employee;
  }
  function category(val) {
    fetch("http://localhost:3001/Employee")
      .then((res) => res.json())
      .then((res) => {
        var newlist = res.filter((user) => user.dept === val);
        setEmployee(newlist);
      });

    return Employee;
  }
  function Ascending() {
    setLoading(true);
    var newList = Employee.sort((a, b) => (a.salary > b.salary ? 1 : -1));
    console.log(newList);
    setEmployee(newList);
    setLoading(false);
  }
  function handleAdd() {
    const emp = {
      name: name,
      gender: gender,
      dept: dept,
      role: role,
      salary: salary,
      id: uuid(),
    };
    const newempjson = JSON.stringify(emp);

    fetch("http://localhost:3001/Employee", {
      method: "POST",
      body: newempjson,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      getEmployee();
    });
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          onChange={(e) => setgender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          onChange={(e) => setdept(e.target.value)}
        />
        <input
          type="text"
          placeholder="role"
          onChange={(e) => setrole(e.target.value)}
        />
        <input
          type="text"
          placeholder="salary"
          onChange={(e) => setsalary(e.target.value)}
        />
        <button
          style={{ width: "150px", marginTop: "10px" }}
          onClick={handleAdd}
        >
          Add employee
        </button>
      </div>
      <div>
        <button onClick={() => category("Marketing")}>Show marketing</button>
        <button onClick={() => category("Finance")}>Show Finance</button>
        <button onClick={() => category("IT")}>Show IT</button>
        <button onClick={() => category("HR")}>Show HR</button>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!Loading &&
          Employee.map((user, index) => {
            return (
              <div
                style={{
                  width: "200px",
                  height: "300px",
                  border: "2px solid black",
                  textAlign: "center",
                }}
                key={index}
              >
                <h3>Name: {user.name}</h3>
                <h4>Gender: {user.gender}</h4>
                <h4>Role: {user.role}</h4>
                <h5>Department: {user.dept}</h5>
                <h6>Salary: {user.salary}</h6>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export { Employee };
