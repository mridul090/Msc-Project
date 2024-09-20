import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Progrect from '../components/Projects/project';
import useCheckUser from '../components/Users/checkuser';

const ProjectPage = () => {
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
        <Progrect />
        {error && <p className="error-message">{error}</p>}
      </div>
    )
  }
  else {
    return alert("Session Out LogIn again");
  }
}

export default ProjectPage
