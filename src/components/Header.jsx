import React from 'react';

const Header = () => {
  // Check if token is present in local storage
  const token = localStorage.getItem('token');
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark mb-3">
        
        <a className="navbar-brand mx-5" href="/">HOME</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-autoS">
            <li className="nav-item active mx-5">
              <a className="nav-link" href="/about">ABOUT US</a>
            </li>
            <li className="nav-item active mx-5">
              <a className="nav-link" href="/contact-us">CONTACT US</a>
            </li>
            <li className="nav-item active mx-5">
              <a className="nav-link" href="/login">USERS</a>
            </li>
            {token ? (
              <li className="nav-item active mx-5">
                <a className="nav-link" href="/logout">LOGOUT</a>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
