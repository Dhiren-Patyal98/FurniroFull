import React, { useEffect, useState } from 'react';
import Sidebar from '../sideBar';
import axios from 'axios';
import './users.css'
export default function Users() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/getuser');
        setUsers(response.data.data); // Assuming response.data.data is an array of users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className='grid-container'>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        
        <div className='header-user-container'>
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.id} className="user-card">
                <h2 className="user-name">{user.firstname} {user.lastname}</h2>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-phone">Phone: {user.phone}</p>
                <p className="user-type">User Type: {user.usertype}</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}
