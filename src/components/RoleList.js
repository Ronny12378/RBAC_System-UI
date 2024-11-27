import React, { useState } from "react";
import "./../styles/Dashboard.css";

const RoleList = () => {
  // Sample users with roles, active/inactive status, and permissions
  const [users, setUsers] = useState([
    {
      email: "john@example.com",
      role: "Admin",
      isActive: true,
      permissions: { read: true, write: true, delete: true },
    },
    {
      email: "jane@example.com",
      role: "Manager",
      isActive: false,
      permissions: { read: true, write: true, delete: false },
    },
    {
      email: "alice@example.com",
      role: "User",
      isActive: true,
      permissions: { read: true, write: false, delete: false },
    },
  ]);

  // State for the new role form
  const [newRole, setNewRole] = useState("");
  const [newPermissions, setNewPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  // Handle adding a new role
  const handleAddRole = (e) => {
    e.preventDefault();

    if (!newRole) {
      alert("Please enter a role name.");
      return;
    }

    const newUser = {
      email: `${newRole.toLowerCase()}@example.com`, // Placeholder email based on role name
      role: newRole,
      isActive: true,
      permissions: newPermissions,
    };

    setUsers([...users, newUser]);
    setNewRole(""); // Reset role input
    setNewPermissions({ read: false, write: false, delete: false }); // Reset permissions
  };

  // Handle toggling user status (active/inactive)
  const handleToggleStatus = (email) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
  };

  // Handle editing user role
  const handleEditUser = (email) => {
    const updatedRole = prompt("Enter new role (Admin, Manager, User):");
    if (updatedRole && ["Admin", "Manager", "User"].includes(updatedRole)) {
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, role: updatedRole } : user
      );
      setUsers(updatedUsers);
    } else {
      alert("Invalid role.");
    }
  };

  // Handle deleting user
  const handleDeleteUser = (email) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.email !== email);
      setUsers(updatedUsers);
    }
  };

  // Handle toggling permissions (read, write, delete)
  const handleTogglePermission = (email, permission) => {
    const updatedUsers = users.map((user) =>
      user.email === email
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              [permission]: !user.permissions[permission],
            },
          }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="section-card">
      <h2>Role List</h2>

      {/* Form to Add New Role */}
      <form onSubmit={handleAddRole}>
        <h3>Add New Role</h3>
        <label>
          
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter role name"
          />
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={newPermissions.read}
              onChange={() =>
                setNewPermissions({ ...newPermissions, read: !newPermissions.read })
              }
            />
            Read
          </label>
          <label>
            <input
              type="checkbox"
              checked={newPermissions.write}
              onChange={() =>
                setNewPermissions({ ...newPermissions, write: !newPermissions.write })
              }
            />
            Write
          </label>
          <label>
            <input
              type="checkbox"
              checked={newPermissions.delete}
              onChange={() =>
                setNewPermissions({ ...newPermissions, delete: !newPermissions.delete })
              }
            />
            Delete
          </label>
        </div>
        <button type="submit">Add Role</button>
      </form>

      {/* Table to Display Users and Roles */}
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Status</th>
            <th>Read</th>
            <th>Write</th>
            <th>Delete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleToggleStatus(user.email)}>
                  {user.isActive ? "Active" : "Inactive"}
                </button>
              </td>
              {/* Permissions Checkboxes */}
              <td>
                <input
                  type="checkbox"
                  checked={user.permissions.read}
                  onChange={() => handleTogglePermission(user.email, "read")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.permissions.write}
                  onChange={() => handleTogglePermission(user.email, "write")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.permissions.delete}
                  onChange={() => handleTogglePermission(user.email, "delete")}
                />
              </td>
              {/* Actions (Edit & Delete) */}
              <td>
                <button onClick={() => handleEditUser(user.email)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
