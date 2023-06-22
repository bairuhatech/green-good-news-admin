import React from 'react';
import './styles.css';

function NotFound() {
  return (
    <div className="container">
      <h1 className="heading">404</h1>
      <p className="text">Oops! Page Not Found</p>
      <img
        src="https://example.com/cute-illustration.png"
        alt="Cute Illustration"
        className="image"
      />
      <p className="subtext">Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
}

export default NotFound;
