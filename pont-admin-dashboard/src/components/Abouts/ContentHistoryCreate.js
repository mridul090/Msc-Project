import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import './contenthistory.css';

const ContentHistoryCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        details: '',
        video_link: '',
        created_date: '',
        history_type: 'general',
        image_field_1: '',
        image_field_2: '',
        image_field_3: '',
        image_field_4: ''
    });

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/settings/images/')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.log('Error fetching images:', error);
            });

        if (id) {
            axios.get(`http://127.0.0.1:8000/api/historycontents/update/${id}/`)
                .then(response => {
                    const data = response.data;
                    const formattedDate = data.created_date.slice(0, 16);
                    console.log(data);
                    setFormData({
                        ...data,
                        subtitle: data.subtitle || '',
                        created_date: formattedDate,
                        image_field_1: data.image_field_1 || '',
                        image_field_2: data.image_field_2 || '',
                        image_field_3: data.image_field_3 || '',
                        image_field_4: data.image_field_4 || ''
                    });
                    setContent(data.details);
                })
                .catch(error => {
                    console.error('Error fetching blog post:', error);
                });
        }

    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleimageChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || ''
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            ...formData,
            details: content,
            image_field_1: formData.image_field_1 ? parseInt(formData.image_field_1) : null,
            image_field_2: formData.image_field_2 ? parseInt(formData.image_field_2) : null,
            image_field_3: formData.image_field_3 ? parseInt(formData.image_field_3) : null,
            image_field_4: formData.image_field_4 ? parseInt(formData.image_field_4) : null
        };
        if (id) {
            axios.put(`http://127.0.0.1:8000/api/historycontents/update/${id}/`, postData)
                .then(response => {
                    console.log('Content History updated successfully:', response.data);
                    alert("Content History updated successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error updating Content History:', error);
                    alert("Error updating Content History");
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/historycontents/', postData)
                .then(response => {
                    console.log('Content History created successfully:', response.data);
                    alert("Content History created successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error creating Content History:', error);
                    alert("Error creating Content History");
                });
        }

    };

    return (
        <div className="form-container">
            <h2>{id ? 'Create History Content' : 'Upload History Content'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Details</label>
                    {/* <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        rows="10"
                        required
                    ></textarea> */}
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                    />
                </div>
                <div className="form-group">
                    <label>Video Link</label>
                    <input
                        type="url"
                        name="video_link"
                        value={formData.video_link}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Created At</label>
                    <input
                        type="datetime-local"
                        name="created_date"
                        value={formData.created_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select
                        name="history_type"
                        value={formData.history_type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="general">General</option>
                        <option value="history">History</option>
                    </select>
                </div>
                {[...Array(4).keys()].map(i => (
                    <div className="form-group" key={i}>
                        <label>Image Field {i + 1}</label>
                        <select
                            name={`image_field_${i + 1}`}
                            value={formData[`image_field_${i + 1}`]}
                            onChange={handleimageChange}
                        >
                            <option value="">Select an image</option>
                            {images.map(image => (
                                <option key={image.id} value={image.id}>{image.title}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="submit">{id ? 'Update Content' : 'Upload Content'}</button>
            </form>
        </div>
    );
};

export default ContentHistoryCreate;
