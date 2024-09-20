import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './contenthistory.css';

const ContentList = () => {
    const [allcontents, setAllcontent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/historycontents/')
            .then(response => {
                setAllcontent(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="content-list">
            <div className='header'>
                <h1>Content History</h1>
                <Link to="/content-history/create" className="create-content-btn">Create History</Link>
            </div>
            <hr className="separator-line" />
            <div className="content-cards">
                {allcontents.map(allcontent => (
                    <div className="content-card" key={allcontent.id}>
                        <p><strong>Title:</strong> {allcontent.title}</p>
                        <p><strong>Created At:</strong> {allcontent.created_date}</p>
                        <p><strong>Details:</strong> {allcontent.details.substring(0, 50)}...</p>
                        <Link to={`/content-history/update/${allcontent.id}`} className="update-link">Update</Link>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ContentList;