import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AboutCreate from '../components/Abouts/AboutCreate';
import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const AboutCreatePage = () => {
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
        <AboutCreate />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
  else {
    return alert("Session Out LogIn again");
  }
};

export default AboutCreatePage;
