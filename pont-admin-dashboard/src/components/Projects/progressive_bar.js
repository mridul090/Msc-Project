import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './progress.css';

const ProgressiveBar = () => {
  const [formData, setFormData] = useState({
    title_1: '',
    amount_1: '',
    title_2: '',
    amount_2: '',
    title_3: '',
    amount_3: '',
    title_4: '',
    amount_4: '',
    title_5: '',
    amount_5: '',
    title_6: '',
    amount_6: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      amount_1: formData.amount_1 ? parseInt(formData.amount_1) : null,
      amount_2: formData.amount_2 ? parseInt(formData.amount_2) : null,
      amount_3: formData.amount_3 ? parseInt(formData.amount_3) : null,
      amount_4: formData.amount_4 ? parseInt(formData.amount_4) : null,
      amount_5: formData.amount_5 ? parseInt(formData.amount_5) : null,
      amount_6: formData.amount_6 ? parseInt(formData.amount_6) : null
    };


    if (id) {
      axios.put(`http://127.0.0.1:8000/api/progress/update/${id}/`, postData)
        .then(response => {
          alert("Created successfully");
          navigate(-1);

        })
        .catch(error => {
          console.error('Error creating:', error);
          alert("Error creating");
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/progress/create/', postData)
        .then(response => {
          alert("Created successfully");
          navigate(-1);
        })
        .catch(error => {
          console.error('Error creating:', error);
          alert("Error creating");
        });
    }

  }

  return (
    <div className="form-container">
      <h2>Create Progressive Bar</h2>
      <form onSubmit={handleSubmit}>
        {[...Array(6).keys()].map(i => (
          <div className="form-group-pair" key={`pair_${i}`}>
            <div className="form-group" key={`title_${i}`}>
              <label>Title_{i + 1}</label>
              <input
                type="text"
                name={`title_${i + 1}`}
                value={formData[`title_${i + 1}`]}
                onChange={handleInputChange}
                // required
              />
            </div>

            <div className="form-group" key={`amount_${i}`}>
              <label>Amount_{i + 1}</label>
              <input
                type="text"
                name={`amount_${i + 1}`}
                value={formData[`amount_${i + 1}`]}
                onChange={handleInputChange}
                // required
              />
            </div>
          </div>
        ))}
        <button type="submit">Create Progressive Bar</button>
      </form>
    </div>
  )
}

export default ProgressiveBar;
