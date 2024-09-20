import { useEffect, useState } from 'react';
import userphoto from '../../assets/demouser.png';
import { Link, useNavigate } from 'react-router-dom';
import './topview.css';

const TopView = ({ title, buttonName, showButton }) => {
  const navigate = useNavigate();
  const [users, setUser] = useState({
    // id: '',
    // email: '',
    name: '',
    // username: '',
    upload_image: '',
    user_role: ''
  });

  useEffect(() => {
    // const loginuserId = localStorage.getItem('id');
    // const loginuserEmail = localStorage.getItem('email');
    const loginuserName = localStorage.getItem('name');
    // const loginuserUsername = localStorage.getItem('username');
    const loginuserImage = localStorage.getItem('upload_image');
    const loginuserUser_role = localStorage.getItem('user_role');
  

    setUser({
      // id: loginuserId,
      // email: loginuserEmail,
      name: loginuserName,
      // username: loginuserUsername,
      upload_image: loginuserImage,
      user_role: loginuserUser_role
    });
  }, []);

  const handleSignout = (e) => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="top-view">
      <div className='user-section'>
        <h3 className="page-title">{title}</h3>
        <div className='user-profile'>
          <img src={`http://127.0.0.1:8000${users.upload_image}` || userphoto} alt="User" className="user-photo" />
          <div className="user-details">
            <p className="user-name">User: {users.name}</p>
            <p className="user-role">Role: {users.user_role}</p>
            <p className='sign-out' onClick={handleSignout}>Sign Out</p>
          </div>
        </div>
      </div>
      <div className='top-view-button'>
        {showButton && <button className="signout-btn">SignOut</button>}
      </div>
    </div>
  );
};

export default TopView;
