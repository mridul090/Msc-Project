import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Settingdesign from '../components/Settings/Setting.js';
import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const SettingsPage = () => {
  const loginuserUser_role = localStorage.getItem('user_role');
  const [isUserNotModerator, setIsUserNotModerator] = useState(true);
  const { isValidUser, error } = useCheckUser();

  useEffect(() => {
    setIsUserNotModerator(loginuserUser_role.toLowerCase() !== 'moderator');
  }, []);

  if (isValidUser === null) {
    return <p>Loading...</p>;
  }

  if (!isValidUser) {
    return <p>Redirecting to login...</p>;
  }


  if (isValidUser) {
    if (isUserNotModerator) {
      return (
        <div className="dashboard-container">
          <Sidebar />
          <Settingdesign />
          {error && <p className="error-message">{error}</p>}
        </div>
      )
    }
  }
  else {
    return alert("Session Out LogIn again");
  }


}

export default SettingsPage
