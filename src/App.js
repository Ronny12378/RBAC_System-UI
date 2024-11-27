import React from "react";
import AddUser from "./components/AddUser";
//import AssignRole from "./components/AssignRole";
import RoleList from "./components/RoleList";

import "./styles/Dashboard.css";

const App = () => {
  return (
    <div className="container">
      <h1>Role Based Access Control System</h1>
      <AddUser />
      
      
      <RoleList />
    </div>
  );
};

export default App;
