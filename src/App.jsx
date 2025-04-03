import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("feedback").select("*");

      if (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      } else {
        setUsers(data);
      }
    };
    fetchUsers(); 
  }, []);

  return (
  <div>
      <h1>Supabase Users</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default App;