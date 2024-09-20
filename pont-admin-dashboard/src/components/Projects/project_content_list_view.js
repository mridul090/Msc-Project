import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './project_content.css';

const ProjectContentListView = () => {
  const [allProjectContents, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/project-content/views')
      .then(response => {
        setAllContent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/project-content/delete/${id}/`)
      .then(response => {
        setAllContent(allProjectContents.filter(allProjectContentPage => allProjectContentPage.id !== id));
        alert("Deleted Successfully");
      })
      .catch(error => {
        alert("Error deleting content");
        console.error('Error deleting content:', error);
      });
  };

  return (
    <div className="Project-Content-list">
      <div className='header'>
        <h1>Project Content</h1>
        <Link to="/project-content/create" className="create-project-content-btn">Create History</Link>
      </div>
      
      <hr className="separator-line" />
      
      <div className="project-content-cards">
        {allProjectContents.map(allContent => (
          <div className="project-content-card" key={allContent.id}>
            {allContent.image && (
              <img
                src={`http://127.0.0.1:8000${allContent.image.image}`}
                alt={allContent.image.title}
                className="project-content-image"
              />
            )}
            <p><strong>Title:</strong> {allContent.title}</p>
            {allContent.sub_title && (
              <p><strong>Sub-Title:</strong> {allContent.sub_title}</p>
            )}
            <p><strong>Created At:</strong> {allContent.created_at}</p>
            <p><strong>Details:</strong> {allContent.details.substring(0, 100)}...</p>
            <div className="button-container">
              <Link to={`/project-content/update/${allContent.id}`} className="project-content-update-link">Update</Link>
              <Link to="#" onClick={() => handleDelete(allContent.id)} className="project-content-delete-link">Delete</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectContentListView;
