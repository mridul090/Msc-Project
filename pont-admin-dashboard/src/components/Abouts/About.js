import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './About.css';

const About = () => {
  const [about, setAbout] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/abouts/list/')
      .then(response => {
        console.log("Get Data about", response.data)
        setAbout(response.data);
      })
      .catch(error => {
        console.error('Error fetching about page:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/abouts/delete/${id}/`)
      .then(response => {
        setAbout(about.filter(aboutpage => aboutpage.id !== id));
        alert("Deleted Succfully");
      })
      .catch(error => {
        alert("Error deleting About");
        console.error('Error deleting About:', error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/about/update/${id}`);
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
        <h1>Who We Are</h1>
        <Link to="/about/create" className="create-about-page-btn">Create About Page</Link>
      </div>
      <hr className="separator-line" />
      <div className='Allcardlist'>
        {about.length === 0 ? (
          <div className="no-posts">No About Page created yet!!</div>
        ) : (
          about.map(post => (
            <div key={post.id} className="about-page-card">
              {post.image_field_1 && (
                <img src={`http://127.0.0.1:8000${post.image_field_1.image}`} alt={post.image_field_1.title} className="about-page-image" />
              )}
              <div className="about-page-content">
                <h2>About Page</h2>
                <p>Created Date: {new Date(post.created_date).toLocaleDateString()}</p>
                <p>Content: {truncateContent(post.history_content, 50)}</p>
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
};

export default About;
