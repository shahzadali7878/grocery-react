import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <div className="Header">
      <div className="Site-Title">
        <Link to="/">Grocery</Link>
      </div>
      <div className="Site-Links">
        <div className="Site-Link">
          {/* For Admin Users */}
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        </div>
      </div>
    </div>
  )
};

export default Header;
