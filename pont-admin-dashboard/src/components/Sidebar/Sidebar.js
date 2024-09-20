import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
  const loginuserUser_role = localStorage.getItem('user_role');
  const [isUserNotModerator, setIsUserNotModerator] = useState(true);

  useEffect(() => {
    setIsUserNotModerator(loginuserUser_role.toLowerCase() != 'moderator');
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="menu-item">
            <Link to="/">
              <i className="fas fa-home">Dashboard </i>
            </Link>
          </li>
          <li className="menu-item">
            <i className="fas fa-hand-holding-heart"> Blog </i>
            <ul className="submenu">
              <li><Link to="/blog/ListView">Blog Post</Link></li>
              {/* <li></li> */}
            </ul>
          </li>
          <li className="menu-item">
            <i className="fas fa-cog">Who We Are </i>
            <ul className="submenu">
              {isUserNotModerator && (<li><Link to="/about">About</Link></li>)}
              <li><Link to="/content-history">Content History</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <i className="fas fa-cog"> What we do </i>
            <ul className="submenu">
              {isUserNotModerator && (<li><Link to="/project/list-view">Project</Link></li>)}
              <li><Link to="/project-progress-bar/list-view">Project Statistic</Link></li>
              <li><Link to="/project-content/list-view">Project Content</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <i className="fas fa-users">
              <Link to="/content-gallery">
                Group Gallery
              </Link>
            </i>
          </li>
          {isUserNotModerator && (
            <li className="menu-item">
              <i className="fas fa-cog"> Settings</i>
              <ul className="submenu">
                <li><Link to="/setting/imagelibrary">Image Library</Link></li>
                <li><Link to="/users">All Users</Link></li>
                <li><Link to={`/setting/${1}`}>Setting</Link></li>
              </ul>
            </li>
          )}

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
