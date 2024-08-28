import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Feedback from './Feedback'; // Assuming you have a Feedback component
import Login from './Login'; // Assuming you have the Login component
import { useLocation } from 'react-router-dom';

const NavbarWebsite = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const routeToAdmin = (path) => {
    navigate(path);
  };

  const handleFeedbackClick = () => {
    setIsFeedbackOpen(true);
  };

  const closeFeedbackDialog = () => {
    setIsFeedbackOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const closeLoginDialog = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (name) => {
    localStorage.setItem('username', name);
    setUsername(name);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  return (
    <>
      <div className='width-full shadow-lg bg-white px-3 py-4 flex justify-between'>
        <div>WEBSITE</div>
        <div className='flex items-center gap-3'>
          {username ? (
            <>
              <p><b>Welcome, {username}</b></p>
              <p className='cursor-pointer' onClick={handleLogout}>Logout</p>
            </>
          ) : (
            <p className='cursor-pointer' onClick={handleLoginClick}>Login</p>
          )}
          <p className='cursor-pointer' onClick={() => routeToAdmin('/about')}>About</p>
          <p className='cursor-pointer' onClick={() => routeToAdmin('/contact')}>Contact</p>
          <p className='cursor-pointer' onClick={() => routeToAdmin('/service')}>Services</p>
          {username && (
            <p className='cursor-pointer' onClick={handleFeedbackClick}>Feedback</p>
          )}
          <p className='cursor-pointer' onClick={() => routeToAdmin('admin/dashboard')}>Admin</p>
        </div>
      </div>

      {/* Feedback Dialog */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-0 max-w-[30rem] min-w-[25rem] rounded">
            <Feedback closeDialog={closeFeedbackDialog} currentPath={location.pathname} />
          </div>
        </div>
      )}

      {/* Login Dialog */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 max-w-[30rem] min-w-[25rem] rounded">
            <Login onLogin={handleLogin} closeDialog={closeLoginDialog} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarWebsite;
