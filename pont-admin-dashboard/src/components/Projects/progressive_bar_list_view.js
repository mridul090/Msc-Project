import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './progress.css';

const ProgressiveBarListView = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/progress/views')
      .then(response => {
        console.log("Progress Data", response.data);
        setProgress(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Progress Data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/progress/delete/${id}/`)
      .then(response => {
        setProgress(progress.filter(progresspage => progresspage.id !== id));
        alert("Deleted Succfully");
      })
      .catch(error => {
        alert("Error deleting About");
        console.error('Error deleting About:', error);
      });
  };


  return (
    <div className="ProgressBar-list">
      <div className='header'>
        <h1>Progressive Bar</h1>
        <Link to="/project-progress-bar/create" className="create-ProgressBar-btn">Create ProgressBar</Link>
      </div>
      <hr className="separator-line" />
      <div className="ProgressBar-cards">
        {progress.map(allcontent => (
          <div className="ProgressBar-card" key={allcontent.id}>
            <p><strong>Title 1:</strong> {allcontent.title_1}</p>
            <p><strong>Amount 1:</strong> {allcontent.amount_1}</p>
            <p><strong>Title 2:</strong> {allcontent.title_2}</p>
            <p><strong>Amount 2:</strong> {allcontent.amount_2}</p>
            <p><strong>Title 3:</strong> {allcontent.title_3}</p>
            <p><strong>Amount 3:</strong> {allcontent.amount_3}</p>
            <p><strong>Title 4:</strong> {allcontent.title_4}</p>
            <p><strong>Amount 4:</strong> {allcontent.amount_4}</p>
            <p><strong>Title 5:</strong> {allcontent.title_5}</p>
            <p><strong>Amount 5:</strong> {allcontent.amount_5}</p>
            <p><strong>Title 6:</strong> {allcontent.title_6}</p>
            <p><strong>Amount 6:</strong> {allcontent.amount_6}</p>
            <p><strong>Created At:</strong> {allcontent.created_date}</p>
            <Link to={`/project-progress-bar/update/${allcontent.id}`} className="prograssive-bar-update-link">Update</Link>
            <Link to="#" onClick={() => handleDelete(allcontent.id)} className="prograssive-bar-delete-link">Delete</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressiveBarListView;
