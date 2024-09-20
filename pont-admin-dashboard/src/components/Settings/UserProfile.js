import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userphoto from '../../assets/demouser.png';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');


      if( token != null && !token){
        const loginuser = localStorage.getItem('user');
        console.log("User Data is ", loginuser);
        setUser(loginuser);
      }
      else{
        console.log("The token is ", token)
        localStorage.removeItem('token');
        navigate('/login');
      }


        // setError('Failed to load user data');
        // if (error.response && error.response.status === 401) {
        //   localStorage.removeItem('token');
        //   navigate('/login');
        // }
      

    };

    fetchUser();
  }, [navigate]);

  if (error) {
    return <div className="user-profile">{error}</div>;
  }

  if (!user) {
    return <div className="user-profile">Loading...</div>;
  }

  const handlesignout = (e) => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="user-profile">
      <img
        src={`http://127.0.0.1:8000${user.upload_image}` || userphoto}
        alt="User"
        className="user-photo"
      />
      <div className="user-info">
        <p className="user-name">{user.first_name} {user.last_name} </p>
        <p className="user-role">{user.user_role}</p>
        <button className="signout-btn" onClick={handlesignout}>SignOut</button>
      </div>
    </div>
  );
};

export default UserProfile;
