import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectListView = () => {
  const [projects, setProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/project/views')
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('Error fetching project page:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/project/delete/${id}`)
      .then(response => {
        setProject(projects.filter(projectspage => projectspage.id !== id));
        alert("Deleted Successfully");
      })
      .catch(error => {
        alert("Error deleting Project");
        console.error('Error deleting Project:', error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/project/update/${id}`);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="about-page-list">
      <div className="header">
        <h1>What We Do</h1>
        <Link to="/project/create" className="create-about-page-btn">Create Project Page</Link>
      </div>
      <hr className="separator-line" />
      <div className='Allcardlist'>
        {projects.length === 0 ? (
          <div className="no-posts">No Project Pages created yet!!</div>
        ) : (
          projects.map(post => (
            <div key={post.id} className="about-page-card">
              <div className="about-page-content">
                <h2>Project Page</h2>
                {post.page_motivation_text1 && (
                  <p>Content: {truncateContent(post.page_motivation_text1, 100)}</p>
                )}
                {post.page_motivation_text2 && (
                  <p>Content: {truncateContent(post.page_motivation_text2, 100)}</p>
                )}
                {post.related_information && (
                  <p>Content: {truncateContent(post.related_information, 100)}</p>
                )}
                {post.project_types && (
                  <p>Content: {post.project_types.type_name}</p>
                )}
                <p>Created Date: {new Date(post.created_at).toLocaleDateString()}</p>
                <div className="about-page-actions">
                  <button className="btn-delete" onClick={() => handleDelete(post.id)}>Delete</button>
                  <button className="btn-update" onClick={() => handleUpdate(post.id)}>Update</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectListView;
