import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // alert('Logout successful!');
    swal("Logging out...", "Logout successful!", "success");


    // Redirect to the login page
    navigate('/login');
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
