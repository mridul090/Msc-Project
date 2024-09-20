import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const ProjectContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    details: '',
    image: '',
    video_link: '',
    content_type: 'general',
    project_type: '',
    created_at: ''
  });

  const [project_type, setProjectType] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/project-type/views')
      .then(response => {
        setProjectType(response.data);
      })
      .catch(error => {
        console.error('Error fetching Project types:', error);
      });

    axios.get('http://127.0.0.1:8000/api/settings/images/')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.log('Error fetching images:', error);
      });

    if (id) {
      axios.get(`http://127.0.0.1:8000/api/project-content/update/${id}/`)
        .then(response => {
          const data = response.data;
          const formattedDate = data.created_at.slice(0, 16);
          setFormData({
            ...data,
            image: data.image || '',
            project_type: data.project_type || '',
            created_at: formattedDate,
          });
          setContent(data.details);
        })
        .catch(error => {
          console.error('Error fetching:', error);
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

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    setFormData({
      ...formData,
      details: newContent
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      details: content,
      image: formData.image ? parseInt(formData.image) : null,
      project_type: formData.project_type ? parseInt(formData.project_type) : null,
    };

    if (id) {
      axios.put(`http://127.0.0.1:8000/api/project-content/update/${id}/`, postData)
        .then(response => {
          alert("Updated successfully");
          navigate(-1);
        })
        .catch(error => {
          console.error('Error updating:', error);
          alert("Error updating");
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/project-content/create/', postData)
        .then(response => {
          alert("Created successfully");
          navigate(-1);
        })
        .catch(error => {
          console.error('Error creating:', error);
          alert("Error creating");
        });
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Create Project Contern' : 'Upload Project Contern'}</h2>
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
          <label>Sub-title</label>
          <input
            type="text"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Details</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={handleEditorChange}
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <select
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          >
            <option value="">Select an image</option>
            {images.map(image => (
              <option key={image.id} value={image.id}>{image.title}</option>
            ))}
          </select>
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
          <label>Content Type</label>
          <select
            name="content_type"
            value={formData.content_type}
            onChange={handleInputChange}
            required
          >
            <option value="approch">Approch</option>
            <option value="impact">Impact</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="form-group">
          <label>Project Type</label>
          <select
            name="project_type"
            value={formData.project_type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Project Type</option>
            {project_type.map(type => (
              <option key={type.id} value={type.id}>{type.type_name}</option>
            ))}
          </select>
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

        <button type="submit">{id ? 'Create Content' : 'Upload Post'}</button>
      </form>
    </div>
  );
}

export default ProjectContent;
