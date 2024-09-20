import React from 'react';
import { Navigate } from 'react-router-dom';

const SecureLogIn = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token != null) {
    return token ? children : <Navigate to="/login" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default SecureLogIn;
