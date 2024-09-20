import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TagManager = ({ tags, setTags }) => {
    const [newTag, setNewTag] = useState('');
    const [allTags, setAllTags] = useState([]);
    const [showAddTag, setShowAddTag] = useState(false);

 
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tag/view/')
            .then(response => {
                setAllTags(response.data);
            })
            .catch(error => {
                console.error('Error fetching tags:', error);
            });
    }, []);

    const handleAddTag = () => {
  
        if (newTag && !allTags.find(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
        
            axios.post('http://127.0.0.1:8000/api/tag/create/', { name: newTag })
                .then(response => {
                    setAllTags([...allTags, response.data]);  
                    setTags([...tags, response.data]);  
                    setNewTag('');
                    setShowAddTag(false);
                })
                .catch(error => {
                    console.error('Error adding new tag:', error);
                });
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag.id !== tagToRemove.id));
    };

    const handleTagSelection = (tag) => {
        if (!tags.some(t => t.id === tag.id)) {
            setTags([...tags, tag]);
        }
    };

    return (
        <div>
            <div className="tags-display">
            {tags.map(tag => (
                <div key={tag.id} className="tag-item">  
                    {tag.name}
                    <button onClick={() => handleRemoveTag(tag)}>Remove</button>
                </div>
            ))}
            </div>
            <button onClick={() => setShowAddTag(true)}>Add New Tag</button>
            {showAddTag && (
                <div className="add-tag-form">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter new tag name"
                    />
                    <button onClick={handleAddTag}>Save Tag</button>
                    <button onClick={() => setShowAddTag(false)}>Cancel</button>
                </div>
            )}
            <div className="existing-tags">
                <h4>Available Tags</h4>
                {allTags.map(tag => (
                    <div key={tag.id} onClick={() => handleTagSelection(tag)} className="existing-tag-item">
                        {tag.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagManager;
