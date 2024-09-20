import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageLibrary.css';

const ImageLibrary = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const apiEndpoint = 'http://127.0.0.1:8000/api/settings/images/';

  useEffect(() => {
    axios.get(apiEndpoint)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the images!", error);
      });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (title && imageFile) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', imageFile);

      axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          setImages([...images, response.data]);
          setTitle('');
          setImageFile(null);
          setImagePreview(null);
        })
        .catch(error => {
          console.error("There was an error uploading the image!", error);
        });
    } else {
      alert('Please provide both title and image.');
    }
  };

  const handleUpdate = () => {
    if (selectedImageId && title) {
      const formData = new FormData();
      formData.append('title', title);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      axios.put(`${apiEndpoint}${selectedImageId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          setImages(images.map(image => image.id === selectedImageId ? response.data : image));
          setTitle('');
          setImageFile(null);
          setImagePreview(null);
          setSelectedImageId(null);
        })
        .catch(error => {
          console.error("There was an error updating the image!", error);
        });
    } else {
      alert('Please select an image to update and provide a title.');
    }
  };

  const handleImageClick = (image, forUpdate) => {
    if (forUpdate) {
      setTitle(image.title);
      setImagePreview(`http://127.0.0.1:8000${image.image}`);
      setSelectedImageId(image.id);
      setImageFile(null);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent event propagation to the parent element
    axios.delete(`${apiEndpoint}${id}/`)
      .then(response => {
        setImages(images.filter(image => image.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the image!", error);
      });
  };

  return (
    <div className="image-library">
      <h1>Image Library</h1>
      <div className="upload-section">
        <div className='image-title-file'>
          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && <img src={imagePreview} alt="Selected" className="image-preview" />}
        <div className='button-class'>
          <button onClick={handleUpload}>Upload Image</button>
          <button onClick={handleUpdate} disabled={!selectedImageId}>Update Image</button>
        </div>
      </div>
      <hr className="divider"></hr>
      <div className="gallery-section">
        {images.length > 0 ? (
          <ul>
            {images.map((image) => (
              <li key={image.id} className="image-item" onClick={() => handleImageClick(image, true)}>
                <img src={`http://127.0.0.1:8000${image.image}`} alt={image.title} />
                <p>{image.title}</p>
                <button className="delete-btn" onClick={(e) => handleDelete(image.id, e)}>✖</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ImageLibrary;
