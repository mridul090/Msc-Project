import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Project_List_View from '../components/Projects/project_list_view';
import useCheckUser from '../components/Users/checkuser';

const Project_ListPage = () => {
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
          <Project_List_View />
          {error && <p className="error-message">{error}</p>}
        </div>
      )
    }
  }
  else {
    return alert("Session Out LogIn again");
  }

}

export default Project_ListPage
