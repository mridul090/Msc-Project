import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Project_Content from '../components/Projects/project_content';
import useCheckUser from '../components/Users/checkuser';


const Project_ContentPage = () => {
  const { isValidUser, error } = useCheckUser();

  if (isValidUser === null) {
    return <p>Loading...</p>;
  }

  if (!isValidUser) {
    return <p>Redirecting to login...</p>;
  }

  if (isValidUser) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <Project_Content />
      </div>
    )
  }
  else {
    return alert("Session Out LogIn again");
  }
}

export default Project_ContentPage
