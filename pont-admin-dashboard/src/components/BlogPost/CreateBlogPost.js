import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import './BlogPost.css';

const BlogPostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        created_at: '',
        start_date: '',
        end_date: '',
        slug: '',
        status: 'draft',
        category: '',
        image_field_1: '',
        image_field_2: '',
        image_field_3: '',
        image_field_4: '',
        image_field_5: '',
        image_field_6: '',
        image_field_7: '',
        image_field_8: '',
        video_link: '',
        embedded_link: ''
    });

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [isEventCategory, setIsEventCategory] = useState(false);
    const [isUserNotModerator, setIsUserNotModerator] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const loginuserUser_role = localStorage.getItem('user_role');

    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {

        setIsUserNotModerator(loginuserUser_role.toLowerCase() != 'moderator');

        axios.get('http://127.0.0.1:8000/api/category/view/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get('http://127.0.0.1:8000/api/settings/images/')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.log('Error fetching images:', error);
            });

        if (id) {
            axios.get(`http://127.0.0.1:8000/api/blog/update/${id}/`)
                .then(response => {
                    const data = response.data;
                    const formattedDate = data.created_at.slice(0, 16);
                    const formattedStartDate = data.start_date.slice(0, 16);
                    const formattedEndDate = data.end_date.slice(0, 16);
                    setFormData({
                        ...data,
                        created_at: formattedDate,
                        start_date: formattedStartDate,
                        end_date: formattedEndDate,
                        category: data.category || '',
                        image_field_1: data.image_field_1 || '',
                        image_field_2: data.image_field_2 || '',
                        image_field_3: data.image_field_3 || '',
                        image_field_4: data.image_field_4 || '',
                        image_field_5: data.image_field_5 || '',
                        image_field_6: data.image_field_6 || '',
                        image_field_7: data.image_field_7 || '',
                        image_field_8: data.image_field_8 || ''
                    });
                    setContent(data.content);
                    if (data.category === 'event') {
                        setIsEventCategory(true);
                    }
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

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        console.log('Selected Category:', selectedCategoryId);
        setFormData({
            ...formData,
            category: selectedCategoryId
        });

        const selectedCategory = categories.find(category => category.id == selectedCategoryId);
        const selectedCategoryName = selectedCategory ? selectedCategory.name : '';
        console.log('Selected Category Name:', selectedCategoryName);
        setIsEventCategory(selectedCategoryName.toLowerCase() === 'event');
    };

    const handleImageChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || ''
        });
    };

    const handleBlogPostSave = (e) => {
        e.preventDefault();
        const postData = {
            ...formData,
            content,
            category: formData.category ? parseInt(formData.category) : null,
            image_field_1: formData.image_field_1 ? parseInt(formData.image_field_1) : null,
            image_field_2: formData.image_field_2 ? parseInt(formData.image_field_2) : null,
            image_field_3: formData.image_field_3 ? parseInt(formData.image_field_3) : null,
            image_field_4: formData.image_field_4 ? parseInt(formData.image_field_4) : null,
            image_field_5: formData.image_field_5 ? parseInt(formData.image_field_5) : null,
            image_field_6: formData.image_field_6 ? parseInt(formData.image_field_6) : null,
            image_field_7: formData.image_field_7 ? parseInt(formData.image_field_7) : null,
            image_field_8: formData.image_field_8 ? parseInt(formData.image_field_8) : null
        };

        if (id) {
            axios.put(`http://127.0.0.1:8000/api/blog/update/${id}/`, postData)
                .then(response => {
                    alert("Blog post updated successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error updating blog post:', error);
                    alert("Error updating blog post");
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/blog/create/', postData)
                .then(response => {
                    alert("Blog post created successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error creating blog post:', error);
                    alert("Error creating blog post");
                });
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Create Blog Post' : 'Upload Blog Post'}</h2>
            <form onSubmit={handleBlogPostSave}>
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
                    <label>Content</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                    />
                {/* {content} */}
                </div>
                <div className="form-group">
                    <label>Created At</label>
                    <input
                        type="datetime-local"
                        name="created_at"
                        value={formData.created_at}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {isEventCategory && (
                    <>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="datetime-local"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="datetime-local"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {isUserNotModerator && (
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {[...Array(8).keys()].map(i => (
                    <div className="form-group" key={i}>
                        <label>Image Field {i + 1}</label>
                        <select
                            name={`image_field_${i + 1}`}
                            value={formData[`image_field_${i + 1}`]}
                            onChange={handleImageChange}
                        >
                            <option value="">Select an image</option>
                            {images.map(image => (
                                <option key={image.id} value={image.id}>{image.title}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className="form-group">
                    <label>Upload Video Link</label>
                    <input
                        type="url"
                        name="video_link"
                        value={formData.video_link}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Embedded Links</label>
                    <input
                        type="url"
                        name="embedded_link"
                        value={formData.embedded_link}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">{id ? 'Create Post' : 'Upload Post'}</button>
            </form>
        </div>
    );
};

export default BlogPostForm;
