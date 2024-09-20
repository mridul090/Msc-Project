import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';
import './About.css';

const AboutCreate = () => {
  const [formData, setFormData] = useState({
    content_history1: '',
    content_history2: '',
    content_history3: '',
    image_field_1: '',
    image_field_2: '',
    image_field_3: '',
    image_field_4: '',
    image_field_5: '',
    image_field_6: '',
    image_field_7: '',
    image_field_8: '',
    history_content: '',
    created_date: '',
    content_gallery: ''
  });

  const [content_historires, setContentHistory] = useState([]);
  const [content_galleries, setContentGallery] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/historycontents/')
      .then(response => {
        setContentHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    axios.get('http://127.0.0.1:8000/api/contentgalleries/')
      .then(response => {
        setContentGallery(response.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });

    axios.get('http://127.0.0.1:8000/api/settings/images/')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.log('Error fetching images:', error);
      });

    if (id) {
      axios.get(`http://127.0.0.1:8000/api/abouts/update/${id}/`)
        .then(response => {
          const data = response.data;
          const formattedDate = data.created_date.slice(0, 16);
          setFormData({
            ...data,
            content_history1: data.content_history1 || '',
            content_history2: data.content_history2 || '',
            content_history3: data.content_history3 || '',
            image_field_1: data.image_field_1 || '',
            image_field_2: data.image_field_2 || '',
            image_field_3: data.image_field_3 || '',
            image_field_4: data.image_field_4 || '',
            image_field_5: data.image_field_5 || '',
            image_field_6: data.image_field_6 || '',
            image_field_7: data.image_field_7 || '',
            image_field_8: data.image_field_8 || '',
            history_content: data.history_content || '',
            created_date: formattedDate,
            content_gallery: data.content_gallery || ''
          });
          setContent(data.history_content);
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


  const handleHistoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value || ''
    });
  };


  const handleGalleryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value || ''
    });
  };


  const handleimageChange = (e) => {
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
      content_history1: formData.content_history1 ? parseInt(formData.content_history1) : null,
      content_history2: formData.content_history2 ? parseInt(formData.content_history2) : null,
      content_history3: formData.content_history3 ? parseInt(formData.content_history3) : null,
      image_field_1: formData.image_field_1 ? parseInt(formData.image_field_1) : null,
      image_field_2: formData.image_field_2 ? parseInt(formData.image_field_2) : null,
      image_field_3: formData.image_field_3 ? parseInt(formData.image_field_3) : null,
      image_field_4: formData.image_field_4 ? parseInt(formData.image_field_4) : null,
      image_field_5: formData.image_field_5 ? parseInt(formData.image_field_5) : null,
      image_field_6: formData.image_field_6 ? parseInt(formData.image_field_6) : null,
      image_field_7: formData.image_field_7 ? parseInt(formData.image_field_7) : null,
      image_field_8: formData.image_field_8 ? parseInt(formData.image_field_8) : null,
      history_content: content,
      content_gallery: formData.content_gallery ? parseInt(formData.content_gallery) : null
    };

    if (id) {
      axios.put(`http://127.0.0.1:8000/api/abouts/update/${id}/`, postData)
        .then(response => {
          alert("About updated successfully");
          navigate(-1);

        })
        .catch(error => {
          console.error('Error updating About:', error);
          alert("Error updating About");
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/abouts/create/', postData)
        .then(response => {
          alert("About created successfully");
          navigate(-1);
        })
        .catch(error => {
          console.error('Error creating About:', error);
          alert("Error creating About");
        });
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Update About Page' : 'Create About Page'}</h2>
      <form onSubmit={handleBlogPostSave}>
        {[...Array(3).keys()].map(i => (
          <div className="form-group" key={i}>
            <label>Historycontent {i + 1}</label>
            <select
              name={`content_history${i + 1}`}
              value={formData[`content_history${i + 1}`]}
              onChange={handleHistoryChange}
            >
              <option value="">Select an image</option>
              {content_historires.map(content_history => (
                <option key={content_history.id} value={content_history.id}>{content_history.title}</option>
              ))}
            </select>
          </div>
        ))}

        {[...Array(8).keys()].map(i => (
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
        <div className="form-group">
          <label>History Content</label>
          {/* <textarea
            name="history_content"
            value={formData.history_content}
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
          <label>Content Gallery</label>
          <select
            name={`content_gallery`}
            value={formData.content_gallery}
            onChange={handleGalleryChange}
          >
            <option value="">Select an image</option>
            {content_galleries.map(content_gallery => (
              <option key={content_gallery.id} value={content_gallery.id}>{content_gallery.title}</option>
            ))}
          </select>
        </div>

        <button type="submit">{id ? 'Update About' : 'Create About'}</button>
      </form>
    </div>
  );
}

export default AboutCreate
