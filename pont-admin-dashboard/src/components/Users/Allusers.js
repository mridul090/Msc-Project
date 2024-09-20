import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="register-user-list">
      <div className="header">
        <h1>User Registration</h1>
        <Link to="/users/create" className="create-register-user-btn">Register new user</Link>
      </div>

      {/* <div className="register-button">
        <button onClick={() => window.location.href = ''}></button>
      </div> */}

      <hr className="separator-line" />

      <div className="register-user-cards">
        {users.map(user => (
          <div key={user.id} className="register-user-card">
            <div className='register-user-image-container '>
              {user.upload_image && (
                <img
                  src={`http://127.0.0.1:8000${user.upload_image}`}
                  alt={user.username}
                  className="register-user-image"
                />
              )}
            </div>
            <h2 className='register-user-title'>{user.username}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.user_role}</p>
            <div className="register-user-button-container">
              <Link to={`/users/update/${user.id}`} className="register-user-update-link">Update</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
