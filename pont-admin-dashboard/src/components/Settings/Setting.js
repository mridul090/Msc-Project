import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './SettingsStyle.css';

const Setting = () => {
    const [blogcategories, setBlogCategories] = useState([]);
    const [blogcategorydata, setBlogCategoryData] = useState({ name: '' });
    const [projectnameslist, setProjectNameList] = useState([]);
    const [projectname, setProjectName] = useState({ type_name: '' });
    const [dashboardname, setDashboardName] = useState({ name: '' });
    const [adminEmails, setAdminEmails] = useState([]);
    const [selectedAdminEmails, setSelectedAdminEmails] = useState([]);
    const { id } = useParams();
    const [setting, setSetting] = useState({
        opptional_dasboard: '',
        activate_dasboard: false,
        responsible_emails: '',
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/category/view/')
            .then(response => setBlogCategories(response.data))
            .catch(error => console.error('Error fetching Blog categories:', error));

        axios.get('http://127.0.0.1:8000/api/project-type/views')
            .then(response => setProjectNameList(response.data))
            .catch(error => console.error('Error fetching project types names:', error));

        axios.get(`http://127.0.0.1:8000/api/settings/${id}/`)
            .then(response => {
                setSelectedAdminEmails(response.data.responsible_emails.split(', '));
                setSetting(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setSetting({
                        opptional_dasboard: '',
                        activate_dasboard: false,
                        responsible_emails: '',
                    });
                } else {
                    console.log('Error fetching settings:', error);
                }
            });

        axios.get('http://127.0.0.1:8000/api/users/emails/')
            .then(response => setAdminEmails(response.data))
            .catch(error => console.log('Error fetching admin emails:', error));
    }, [id]);

    const handleCategoryChanges = (e) => {
        setBlogCategoryData({
            ...blogcategorydata,
            name: e.target.value
        });
    };

    const handleProjectNameChanges = (e) => {
        setProjectName({
            ...projectname,
            type_name: e.target.value
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSetting(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleToggleChange = () => {
        const updatedSetting = {
            ...setting,
            activate_dasboard: !setting.activate_dasboard
        };

        setSetting(updatedSetting);

        const url = `http://127.0.0.1:8000/api/settings/${id}/`;

        axios.put(url, updatedSetting)
            .then(response => {
                setSetting(response.data);
                console.log('Dashboard activation status updated successfully');
            })
            .catch(error => console.log('Error updating dashboard activation status:', error));
    };

    const handleEmailChange = (event) => {
        const selectedId = event.target.value;
        const selectedEmail = adminEmails.find(email => email.id === parseInt(selectedId));

        if (selectedEmail && !selectedAdminEmails.includes(selectedEmail.email)) {
            setSelectedAdminEmails([...selectedAdminEmails, selectedEmail.email]);
            setSetting(prevState => ({
                ...prevState,
                responsible_emails: [...selectedAdminEmails, selectedEmail.email].join(', ')
            }));
        }
    };

    const handleTextareaChange = (e) => {
        const updatedEmails = e.target.value.split(', ').map(email => email.trim());
        setSelectedAdminEmails(updatedEmails);
        setSetting(prevState => ({
            ...prevState,
            responsible_emails: updatedEmails.join(', ')
        }));
    };

    const handleSettingCreate = (formData) => {
        const postData = {
            opptional_dasboard: formData.opptional_dasboard || '',
            activate_dasboard: formData.activate_dasboard,
            responsible_emails: formData.responsible_emails || '',
        };
        return postData;
    };

    const handleSubmit = () => {
        const url = `http://127.0.0.1:8000/api/settings/${id}/`;
        axios.get(url)
            .then(response => {
                axios.put(url, setting)
                    .then(response => setSetting(response.data))
                    .catch(error => console.log('Error updating settings:', error));
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    const postData = handleSettingCreate(setting);
                    axios.post(url, postData)
                        .then(response => setSetting(response.data))
                        .catch(error => console.log('Error creating settings:', error));
                } else {
                    console.log('Error fetching settings:', error);
                }
            });
    };

    const handleSubmitData = (e, type) => {
        e.preventDefault();
        if (type === 'category') {
            axios.post('http://127.0.0.1:8000/api/category/create/', blogcategorydata)
                .then(response => {
                    alert("Category created successfully");
                    setBlogCategoryData({ name: '' });
                    setBlogCategories([...blogcategories, response.data]);
                })
                .catch(error => {
                    console.error('Error creating Category:', error);
                    alert("Error creating Category");
                });
        } else if (type === 'project') {
            axios.post('http://127.0.0.1:8000/api/project-type/create/', projectname)
                .then(response => {
                    alert("Project Name created successfully");
                    setProjectName({ type_name: '' });
                    setProjectNameList([...projectnameslist, response.data]);
                })
                .catch(error => {
                    console.error('Error creating Project Name:', error);
                    alert("Error creating Project Name");
                });
        }
    };

    return (
        <div className="setting-page">
            <div className="setting-header">
                <h1>Setting</h1>
            </div>
            <div className='setting-body'>
                <div className='setting-section'>
                    <div className='setting-section-input'>
                        <label>Insert Category name</label>
                        <input
                            type="text"
                            name="Blog_category"
                            value={blogcategorydata.name}
                            onChange={handleCategoryChanges}
                        />
                        <button
                            type="submit"
                            onClick={(e) => handleSubmitData(e, 'category')}
                            className='btn-create'
                        >
                            Create Category
                        </button>
                    </div>
                    <div className='setting-section-view'>
                        <h5>All Categories</h5>
                        <div className='setting-section-list'>
                            {blogcategories.length === 0 ? (
                                <div className="no-posts">No About Page created yet!!</div>
                            ) : (
                                blogcategories.map(categories => (
                                    <p key={categories.id}>{categories.name}</p>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className='setting-section'>
                    <div className='setting-section-input'>
                        <label>Insert Projects name</label>
                        <input
                            type="text"
                            name="Project_Name"
                            value={projectname.type_name}
                            onChange={handleProjectNameChanges}
                        />
                        <button
                            type="submit"
                            onClick={(e) => handleSubmitData(e, 'project')}
                            className='btn-create'
                        >
                            Create Project Name
                        </button>
                    </div>
                    <div className='setting-section-view'>
                        <h5>All Categories</h5>
                        <div className='setting-section-list'>
                            {projectnameslist.length === 0 ? (
                                <div className="no-posts">No Project Name created yet!!</div>
                            ) : (
                                projectnameslist.map(p_name => (
                                    <p key={p_name.id}>{p_name.type_name}</p>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className='setting-section'>
                    <div className='setting-section-input'>
                        <label>New Dashboard Name</label>
                        <input
                            type="text"
                            name="opptional_dasboard"
                            value={setting.opptional_dasboard}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit} className='btn-create'>
                            Save Dashboard
                        </button>

                        <label className='email-list-title'>Admin Emails</label>
                        <select
                            name="admin"
                            value=""
                            onChange={handleEmailChange}
                            className='dropdown-list'
                        >
                            <option value="">Select an email</option>
                            {adminEmails.map(adminEmail => (
                                <option key={adminEmail.id} value={adminEmail.id}>{adminEmail.email}</option>
                            ))}
                        </select>
                    </div>
                    <div className='setting-section-view'>
                        <h5>Activate New Dashboard</h5>
                        <div className='setting-section-list'>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={setting.activate_dasboard}
                                    onChange={handleToggleChange}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <h5 className='email-list-title'>Selected Emails</h5>
                        <textarea
                            value={selectedAdminEmails.join(', ')}
                            onChange={handleTextareaChange}
                            className="email-textarea"
                        />
                        <button onClick={handleSubmit} className='emails-submit btn-create'>
                            Save Emails
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;