import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ContentGalleryCreate from '../components/Abouts/ContentGalleryCreate';
import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const ContentGalleryCreatePage = () => {
    const { isValidUser, error, users } = useCheckUser();

    if (isValidUser === null) {
        return <p>Loading...</p>;
    }

    if (!isValidUser) {
        return <p>Redirecting to login...</p>;
    }

    if (isValidUser) {
        return (
            <div className="dashboard-container">
                <Sidebar />
                <ContentGalleryCreate />
                {error && <p className="error-message">{error}</p>}
            </div>
        )
    }
    else {
        return alert("Session Out LogIn again");
    }
};

export default ContentGalleryCreatePage;

