import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const Project = () => {
  const [formData, setFormData] = useState({
    page_motivation_text1: '',
    page_motivation_text2: '',
    project_content1: '',
    project_content2: '',
    project_content3: '',
    project_content4: '',
    project_content5: '',
    project_content6: '',
    project_progressive_bar: '',
    project_approach: '',
    project_impact: '',
    content_gallery1: '',
    content_gallery2: '',
    content_gallery3: '',
    content_gallery4: '',
    content_gallery5: '',
    content_gallery6: '',
    related_information: '',
    project_types: '',
    embedded_links1: '',
    embedded_links2: '',
    history_content: '',
    created_at: '',
    updated_at: ''
  });

  const [content_galleries, setContentGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [project_content, setProjectContent] = useState([]);
  const [progressive_bar, setProgressiveBar] = useState([]);
  const [project_type, setProjectType] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const editor = useRef(null);
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/contentgalleries/')
      .then(response => {
        setContentGallery(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    axios.get('http://127.0.0.1:8000/api/project-content/views')
      .then(response => {
        setProjectContent(response.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });

    axios.get('http://127.0.0.1:8000/api/progress/views')
      .then(response => {
        setProgressiveBar(response.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });

    axios.get('http://127.0.0.1:8000/api/project-type/views')
      .then(response => {
        setProjectType(response.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
    console.log("Id received ", id);
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/project/update/${id}/`)
        .then(response => {
          const data = response.data;
          console.log("update data received, ", data);


          const formattedDate = data.created_date ? data.created_date.slice(0, 16) : data.created_at ? data.created_at.slice(0, 16) : '';

          setFormData({
            ...data,
            project_content1: data.project_content1 || '',
            project_content2: data.project_content2 || '',
            project_content3: data.project_content3 || '',
            project_content4: data.project_content4 || '',
            project_content5: data.project_content5 || '',
            project_content6: data.project_content6 || '',
            project_progressive_bar: data.project_progressive_bar || '',
            project_approach: data.project_approach || '',
            project_impact: data.project_impact || '',
            content_gallery1: data.content_gallery1 || '',
            content_gallery2: data.content_gallery2 || '',
            content_gallery3: data.content_gallery3 || '',
            content_gallery4: data.content_gallery4 || '',
            content_gallery5: data.content_gallery5 || '',
            content_gallery6: data.content_gallery6 || '',
            project_types: data.project_types || '',
            created_at: formattedDate
          });
          setContent1(data.page_motivation_text1);
          setContent2(data.page_motivation_text2);
          setContent3(data.related_information);
        })
        .catch(error => {
          console.error('Error fetching project data:', error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      page_motivation_text1: content1,
      page_motivation_text2: content2,
      project_content1: formData.project_content1 ? parseInt(formData.project_content1) : null,
      project_content2: formData.project_content2 ? parseInt(formData.project_content2) : null,
      project_content3: formData.project_content3 ? parseInt(formData.project_content3) : null,
      project_content4: formData.project_content4 ? parseInt(formData.project_content4) : null,
      project_content5: formData.project_content5 ? parseInt(formData.project_content5) : null,
      project_content6: formData.project_content6 ? parseInt(formData.project_content6) : null,
      project_progressive_bar: formData.project_progressive_bar ? parseInt(formData.project_progressive_bar) : null,
      project_approach: formData.project_approach ? parseInt(formData.project_approach) : null,
      project_impact: formData.project_impact ? parseInt(formData.project_impact) : null,
      content_gallery1: formData.content_gallery1 ? parseInt(formData.content_gallery1) : null,
      content_gallery2: formData.content_gallery2 ? parseInt(formData.content_gallery2) : null,
      content_gallery3: formData.content_gallery3 ? parseInt(formData.content_gallery3) : null,
      content_gallery4: formData.content_gallery4 ? parseInt(formData.content_gallery4) : null,
      content_gallery5: formData.content_gallery5 ? parseInt(formData.content_gallery5) : null,
      content_gallery6: formData.content_gallery6 ? parseInt(formData.content_gallery6) : null,
      related_information: content3,
      project_types: formData.project_types ? parseInt(formData.project_types) : null
    };

    if (id) {
      axios.put(`http://127.0.0.1:8000/api/project/update/${id}/`, postData)
        .then(response => {
          alert("Updated successfully");
          navigate(-1);
        })
        .catch(error => {
          console.error('Error updating:', error);
          alert("Error updating About");
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/project/create/', postData)
        .then(response => {
          alert("About created successfully");
          navigate(-1);
        })
        .catch(error => {
          console.error('Error creating Project:', error.project_types_error);
          alert("Error creating About");
        });
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Update Project Page' : 'Create Project Page'}</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Project Type</label>
          <select
            name={`project_types`}
            value={formData.project_types}
            onChange={handleInputChange}
          >
            <option value="">Select Project Type</option>
            {project_type.map(type => (
              <option key={type.id} value={type.id}>{type.type_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Project Motivation 1</label>
          {/* <textarea
            name="page_motivation_text1"
            value={formData.page_motivation_text1}
            onChange={handleInputChange}
            rows="10"
          // required
          ></textarea> */}
          <JoditEditor
            ref={editor}
            value={content1}
            onChange={newContent => setContent1(newContent)}
          />
        </div>

        <div className="form-group">
          <label>Project Motivation 2</label>
          {/* <textarea
            name="page_motivation_text2"
            value={formData.page_motivation_text2}
            onChange={handleInputChange}
            rows="10"
          // required
          ></textarea> */}
          <JoditEditor
            ref={editor}
            value={content2}
            onChange={newContent => setContent2(newContent)}
          />
        </div>

        {[...Array(6).keys()].map(i => (
          <div className="form-group" key={i}>
            <label>Project content {i + 1}</label>
            <select
              name={`project_content${i + 1}`}
              value={formData[`project_content${i + 1}`]}
              onChange={handleInputChange}
            >
              <option value="">Select Project Content</option>
              {project_content
                .filter(content => {
                  // console.log("Project type name", content.project_types);
                  return content.content_type === 'general' && content.project_type.id === parseInt(formData.project_types);
                })
                .map(content => (
                  <option key={content.id} value={content.id}>{content.title}</option>
                ))}
            </select>
          </div>
        ))}

        <div className="form-group">
          <label>Project Prograssive's</label>
          <select
            name="project_progressive_bar"
            value={formData.project_progressive_bar}
            onChange={handleInputChange}
          >
            <option value="">Select Project Prograssive</option>
            {progressive_bar.map(progressive => (
              <option key={progressive.id} value={progressive.id}>{progressive.title_1} , {progressive.amount_1} ...</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Project Approch</label>
          <select
            name="project_approach"
            value={formData.project_approach}
            onChange={handleInputChange}
          >
            <option value="">Select Project Approch</option>
            {project_content
              .filter(content => {
                // console.log("content type name", content.content_type);
                return content.content_type === 'approch' && content.project_type.id === parseInt(formData.project_types);
              })
              .map(content => (
                <option key={content.id} value={content.id}>{content.title}</option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Project Impacts</label>
          <select
            name="project_impact"
            value={formData.project_impact}
            onChange={handleInputChange}
          >
            <option value="">Select Project Impacts</option>
            {project_content && project_content
              .filter(content => {
                // console.log("content type name", content.content_type, "selected project type", formData.project_types);
                return content.content_type === 'impact' && content.project_type.id === parseInt(formData.project_types);
              })
              .map(content => (
                <option key={content.id} value={content.id}>{content.title}</option>
              ))}
          </select>
        </div>

        {[...Array(6).keys()].map(i => (
          <div className="form-group" key={i}>
            <label>Content Gallery {i + 1}</label>
            <select
              name={`content_gallery${i + 1}`}
              value={formData[`content_gallery${i + 1}`]}
              onChange={handleInputChange}
            >
              <option value="">Select Project Gallery</option>
              {content_galleries.map(content => (
                <option key={content.id} value={content.id}>{content.title}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="form-group">
          <label>Related Information</label>
          {/* <textarea
            name="related_information"
            value={formData.related_information}
            onChange={handleInputChange}
            rows="10"
          // required
          ></textarea> */}
          <JoditEditor
            ref={editor}
            value={content3}
            onChange={newContent => setContent3(newContent)}
          />
        </div>

        <div className="form-group">
          <label>Created At</label>
          <input
            type="datetime-local"
            name="created_at"
            value={formData.created_at}
            onChange={handleInputChange}
          // required
          />
        </div>

        <button type="submit">{id ? 'Update Project' : 'Create Project'}</button>
      </form>
    </div>
  )
}

export default Project;
