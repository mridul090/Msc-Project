import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Progressive_Bar from '../components/Projects/progressive_bar';
import useCheckUser from '../components/Users/checkuser';

const ProgressiveBarPage = () => {  
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
        <Progressive_Bar />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  } else {
    return alert('Session Out LogIn again');
  }
};

export default ProgressiveBarPage;
