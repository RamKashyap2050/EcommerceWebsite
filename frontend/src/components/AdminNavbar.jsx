import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-smoky-white">
      <a className="navbar-brand" href="/">Admin Dashboard</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#admin-navbar-nav" aria-controls="admin-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="admin-navbar-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/adminDashboard">Dashboard</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="admin-settings-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Settings
            </a>
            <div className="dropdown-menu" aria-labelledby="admin-settings-dropdown">
              <a className="dropdown-item" href="/adminprofile">Profile</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/adminLogout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
