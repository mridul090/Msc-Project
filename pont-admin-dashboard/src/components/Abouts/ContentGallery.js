import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ContentGallery.css';



const ContentGallery = () => {


    const [allcontetsgallery, setAllcontentgallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:8000/api/contentgalleries/')
            .then(response => {
                console.log("Get Data gallery", response.data)
                setAllcontentgallery(response.data);
                setLoading(false);
                console.log(response.data);
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
                setAllcontentgallery(allcontetsgallery.filter(content => content.id !== id));
            })
            .catch(error => {
                console.error('Error deleting content:', error);
            });
    };

    return (
        <div className="content-gallery-list">
            <div className='header'>
                <h1>Content Gallery</h1>
                <Link to="/content-gallery/create" className="create-content-gallery-btn">Create Content Gallery</Link>
            </div>
            <hr className="separator-line" />
            <div className="content-gallery-cards">
                {allcontetsgallery.map(allcontent => (
                    <div className="content-gallery-card" key={allcontent.id}>
                        <p><strong>Title:</strong> {allcontent.title} </p>
                        <div className='imges-list'>
                            {allcontent.image_field_1 && <img src={`http://127.0.0.1:8000${allcontent.image_field_1.image}`} alt={allcontent.title} className="images" />}
                            {allcontent.image_field_2 && <img src={`http://127.0.0.1:8000${allcontent.image_field_2.image}`} alt={allcontent.title} className="images" />}
                            {allcontent.image_field_3 && <img src={`http://127.0.0.1:8000${allcontent.image_field_3.image}`} alt={allcontent.title} className="images" />}
                        </div>
                        <div className="button-container">
                            <Link to={`/content-gallery/update/${allcontent.id}`} className="content-gallery-update-link">Update</Link>
                            <Link to={'#'} onClick={() => handleDelete(allcontent.id)} className="content-gallery-delete-link">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};


export default ContentGallery;
