import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UserCreateForm.css';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        user_role: '',
        account_status: 'inactive',
        upload_image: '',
        is_staff: false,
        is_active: false,
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            axios.get(`http://127.0.0.1:8000/api/users/${id}/`)
                .then(response => {
                    const data = response.data;
                    setFormData({
                        ...data,
                        upload_image: '',  // Clear upload_image field to allow a new image upload
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            upload_image: e.target.files[0],  // Handle file upload
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userData = new FormData();
    
        Object.keys(formData).forEach(key => {
            if (formData[key] !== '') {
                userData.append(key, formData[key]);
            }
        });
    
        const url = isEditMode 
            ? `http://localhost:8000/api/users/${id}/`
            : 'http://localhost:8000/api/users/create';
        const method = isEditMode ? 'put' : 'post';
    
        axios({
            method: method,
            url: url,
            data: userData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            alert("User details saved successfully");
            navigate(-1);
        })
        .catch(error => {
            console.error('Error saving user details:', error);
            alert("Error saving user details");
        });
    };
    

    return (
        <div className="form-container">
            <h2>{isEditMode ? 'Edit User Account' : 'Create User Account'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        minLength={8}
                        placeholder={isEditMode ? "Leave blank to keep current password" : ""}
                    />
                </div>

                <div className="form-group">
                    <label>User Role</label>
                    <select
                        name="user_role"
                        value={formData.user_role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="superuser">SuperUser</option>
                        <option value="moderator">Moderator</option>
                        <option value="management">Management</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Account Status</label>
                    <select
                        name="account_status"
                        value={formData.account_status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Upload Image</label>
                    <input
                        type="file"
                        name="upload_image"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form-group">
                    <label>Is Staff</label>
                    <input
                        type="checkbox"
                        name="is_staff"
                        checked={formData.is_staff}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Is Active</label>
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">{isEditMode ? 'Update User' : 'Create User'}</button>
            </form>
        </div>
    );
};

export default RegisterUser;
