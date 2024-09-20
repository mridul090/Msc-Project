import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';

import SettingImagesPages from './pages/SettingImagesPages';
import SettingsPages from './pages/SettingsPage';

import BlogPostCreatePage from './pages/BlogPostCreatePage';
import BlogPostListViewPage from './pages/BlogPostViewPage';

import ContenHistoryPage from './pages/ContenHistoryPage';
import ContenHistoryCreatePage from './pages/ContenHistoryCreatePage';

import UserPage from './pages/UserPage';
import UserRegistrationPage from './pages/UserRegistrationPage';
import Login from './components/Users/Login';
import SecureLogIn from './components/Users/SecureLogIn';

import ContentGalleryPage from './pages/ContentGalleryPage';
import ContentGalleryCreatePage from './pages/ContentGalleryCreatePage';

import AboutPage from './pages/AboutPage';
import AboutCreatePage from './pages/AboutCreatePage';

import ProjectPage from './pages/ProjectPage';
import Project_ListPage from './pages/Project_ListPage';

import Project_ContentPage from './pages/Project_ContentPage';
import Project_Content_ListPage from './pages/Project_Content_ListPage';

import Progressive_BarPage from './pages/Progressive_BarPage';
import Progressive_Bar_ListPage from './pages/Progressive_Bar_ListPage';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SecureLogIn><DashboardPage /></SecureLogIn>} />
        <Route path="/setting/imagelibrary" element={<SecureLogIn><SettingImagesPages /></SecureLogIn>} />
        <Route path="/blog/listview" element={<SecureLogIn><BlogPostListViewPage /></SecureLogIn>} />
        <Route path="/blog/create" element={<SecureLogIn><BlogPostCreatePage /></SecureLogIn>} />
        <Route path="/blog/update/:id" element={<SecureLogIn><BlogPostCreatePage /></SecureLogIn>} />
        <Route path="/content-history" element={<SecureLogIn><ContenHistoryPage /></SecureLogIn>} />
        <Route path="/content-history/create" element={<SecureLogIn><ContenHistoryCreatePage /></SecureLogIn>} />
        <Route path="/content-history/update/:id" element={<SecureLogIn><ContenHistoryCreatePage /></SecureLogIn>} />
        <Route path="/content-gallery" element={<SecureLogIn><ContentGalleryPage /></SecureLogIn>} />
        <Route path="/content-gallery/create" element={<SecureLogIn><ContentGalleryCreatePage /></SecureLogIn>} />
        <Route path="/content-gallery/update/:id" element={<SecureLogIn><ContentGalleryCreatePage /></SecureLogIn>} />
        <Route path="/about" element={<SecureLogIn><AboutPage /></SecureLogIn>} />
        <Route path="/about/create" element={<SecureLogIn><AboutCreatePage /></SecureLogIn>} />
        <Route path="/about/update/:id" element={<SecureLogIn><AboutCreatePage /></SecureLogIn>} />

        <Route path="/project/list-view" element={<SecureLogIn><Project_ListPage /></SecureLogIn>} />
        <Route path="/project/create" element={<SecureLogIn><ProjectPage /></SecureLogIn>} />
        <Route path="/project/update/:id" element={<SecureLogIn><ProjectPage /></SecureLogIn>} />
        <Route path="/project/delete/:id" element={<SecureLogIn><ProjectPage /></SecureLogIn>} />
        
        <Route path="/project-content/list-view" element={<SecureLogIn><Project_Content_ListPage /></SecureLogIn>} />
        <Route path="/project-content/create" element={<SecureLogIn><Project_ContentPage /></SecureLogIn>} />
        <Route path="/project-content/update/:id" element={<SecureLogIn><Project_ContentPage /></SecureLogIn>} />
        <Route path="/project-content/delete/:id" element={<SecureLogIn><Project_ContentPage /></SecureLogIn>} />

        <Route path="/project-progress-bar/list-view" element={<SecureLogIn><Progressive_Bar_ListPage /></SecureLogIn>} />
        <Route path="/project-progress-bar/create" element={<SecureLogIn><Progressive_BarPage /></SecureLogIn>} />
        <Route path="/project-progress-bar/update/:id" element={<SecureLogIn><Progressive_BarPage /></SecureLogIn>}/>
        <Route path="/project-progress-bar/delete/:id" element={<SecureLogIn><Progressive_BarPage /></SecureLogIn>}/>

        <Route path="/setting/:id" element={<SecureLogIn><SettingsPages /></SecureLogIn>} />
        <Route path="/users" element={<SecureLogIn><UserPage /></SecureLogIn>} />
        <Route path="/users/create" element={<SecureLogIn><UserRegistrationPage /></SecureLogIn>} />
        <Route path="/users/update/:id" element={<SecureLogIn><UserRegistrationPage /></SecureLogIn>} />
      </Routes>
    </Router>
  );
}

export default App;
