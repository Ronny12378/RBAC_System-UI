import React, { useState } from "react";
import "./../styles/Dashboard.css";

const AddUser = () => {
    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User"); // Default role is "User"

    // State for the list of users
    const [users, setUsers] = useState([]);

    // State to manage which user is being edited
    const [editingUser, setEditingUser] = useState(null);

    // Handle form submission for adding/editing user
    const handleAddUser = () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const newUser = { name, email, password, role };

        if (editingUser) {
            // Editing an existing user
            const updatedUsers = users.map((user) =>
                user.email === editingUser.email ? newUser : user
            );
            setUsers(updatedUsers);
            setEditingUser(null); // Clear editing state after saving
        } else {
            // Adding a new user
            setUsers([...users, newUser]);
        }

        // Clear form after adding/editing
        setName("");
        setEmail("");
        setPassword("");
        setRole("User"); // Reset role to default
    };

    // Handle editing user
    const handleEditUser = (user) => {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setRole(user.role); // Set role for editing
        setEditingUser(user); // Set the user being edited
    };

    // Handle deleting a user
    const handleDeleteUser = (email) => {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
    };

    return (
        <div className="section-card">
            <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Set name state
            />
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set email state
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set password state
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)} // Set role state
            >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
            </select>
            <button onClick={handleAddUser}>
                {editingUser ? "Save Changes" : "Add User"}
            </button>

            {/* Display the user list below the form */}
            <div className="user-list">
                <h3>Users List</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEditUser(user)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteUser(user.email)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display user details below the table */}
            <div className="user-details">
                <h3>User Details</h3>
                {users.map((user, index) => (
                    <div key={index} className="user-info">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        {/* <p><strong>Password:</strong> {user.password}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddUser;
