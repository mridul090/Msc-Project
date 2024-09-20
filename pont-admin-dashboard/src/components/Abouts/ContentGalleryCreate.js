import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ContentGallery.css';

const ContentGalleryCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        image_field_1: '',
        image_field_2: '',
        image_field_3: '',
        image_field_4: '',
        image_field_5: '',
        image_field_6: '',
        image_field_7: '',
        image_field_8: '',
        image_field_9: '',
        image_field_10: '',
        image_field_11: '',
        image_field_12: ''
    });

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/settings/images/')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.log('Error fetching images:', error);
            });
        
        if (id) {
                axios.get(`http://127.0.0.1:8000/api/contentgalleries/update/${id}/`)
                    .then(response => {
                        const data = response.data;
                        setFormData({
                            ...data,
                            image_field_1: data.image_field_1 || '',
                            image_field_2: data.image_field_2 || '',
                            image_field_3: data.image_field_3 || '',
                            image_field_4: data.image_field_4 || '',
                            image_field_5: data.image_field_5 || '',
                            image_field_6: data.image_field_6 || '',
                            image_field_7: data.image_field_7 || '',
                            image_field_8: data.image_field_8 || '',
                            image_field_9: data.image_field_9 || '',
                            image_field_10: data.image_field_10 || '',
                            image_field_11: data.image_field_11 || '',
                            image_field_12: data.image_field_12 || ''
                        });
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
            image_field_1: formData.image_field_1 ? parseInt(formData.image_field_1) : null,
            image_field_2: formData.image_field_2 ? parseInt(formData.image_field_2) : null,
            image_field_3: formData.image_field_3 ? parseInt(formData.image_field_3) : null,
            image_field_4: formData.image_field_4 ? parseInt(formData.image_field_4) : null,
            image_field_5: formData.image_field_5 ? parseInt(formData.image_field_5) : null,
            image_field_6: formData.image_field_6 ? parseInt(formData.image_field_6) : null,
            image_field_7: formData.image_field_7 ? parseInt(formData.image_field_7) : null,
            image_field_8: formData.image_field_8 ? parseInt(formData.image_field_8) : null,
            image_field_9: formData.image_field_9 ? parseInt(formData.image_field_9) : null,
            image_field_10: formData.image_field_10 ? parseInt(formData.image_field_10) : null,
            image_field_11: formData.image_field_11 ? parseInt(formData.image_field_11) : null,
            image_field_12: formData.image_field_12 ? parseInt(formData.image_field_12) : null
     

        };
        if (id) {
            axios.put(`http://127.0.0.1:8000/api/contentgalleries/update/${id}/`, postData)
                .then(response => {
                    alert("Content Gallery updated successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error updating Content Gallery:', error);
                    alert("Error updating Content Gallery");
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/contentgalleries/create/', postData)
                .then(response => {
                    alert("Content Gallery created successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error creating Content Gallery:', error);
                    alert("Error creating Content Gallery");
                });
        }

    };

  return (
    <div className="form-container">
    <h2>{id ? 'Create Content Gallery' : 'Upload Content Gallery'}</h2>
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
        {[...Array(12).keys()].map(i => (
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
        <button type="submit">{id ? 'Update Content Gallery' : 'Upload Content Gallery'}</button>
    </form>
</div>
  )
}

export default ContentGalleryCreate
