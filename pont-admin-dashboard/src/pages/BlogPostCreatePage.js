import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import CreateBlogPost from '../components/BlogPost/CreateBlogPost';
import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const BlogPostCreatePage = () => {
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
        <CreateBlogPost />
        {error && <p className="error-message">{error}</p>}
      </div>
    )
  }
  else {
    return alert("Session Out LogIn again");
  }
};

export default BlogPostCreatePage;
