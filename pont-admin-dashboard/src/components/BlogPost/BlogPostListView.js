import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BlogPost.css';

const BlogPostList = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/blog/view/')
            .then(response => {
                setBlogPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/blog/delete/${id}/`)
            .then(response => {
                setBlogPosts(blogPosts.filter(post => post.id !== id));
            })
            .catch(error => {
                console.error('Error deleting blog post:', error);
            });
    };

    const handleUpdate = (id) => {
        navigate(`/blog/update/${id}`);
    };

    const truncateContent = (content, maxLength) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + '...';
    };

    return (
        <div className="blog-post-list">
            <div className="header">
                <h1>Blog Post</h1>
                <Link to="/blog/create" className="create-blog-post-btn">Create Blog Post</Link>
            </div>
            <hr className="separator-line" />
            <div className='Allcardlist'>
            {blogPosts.length === 0 ? (
                <div className="no-posts">No blog posts available</div>
            ) : (
                blogPosts.map(post => (
                    <div key={post.id} className="blog-post-card">
                        {post.image_field_1 && (
                            <img src={`http://127.0.0.1:8000${post.image_field_1.image}`} alt={post.image_field_1.title} className="blog-post-image"/>
                        )}
                        <div className="blog-post-content">
                            <h2>Title: {post.title}</h2>
                            <p>Date: {new Date(post.created_at).toLocaleDateString()}</p>
                            <p className='blog_status'>Status: {post.status}</p>
                            <p>Content: {truncateContent(post.content, 20)}</p>
                            <div className="blog-post-actions">
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

export default BlogPostList;
