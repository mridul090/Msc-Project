import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Project_Content_List_View from '../components/Projects/project_content_list_view';
import useCheckUser from '../components/Users/checkuser';

const Project_Content_ListPage = () => {
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
        <Project_Content_List_View />
      </div>
    )
  }
  else {
    return alert("Session Out LogIn again");
  }
};

export default Project_Content_ListPage
