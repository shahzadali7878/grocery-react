import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="Admin-Dashboard">
      <div className="Title">
        Admin Dashboard
      </div>

      <div className="Menu-Items">
        <Link to="/admin/categories" className="Menu-Item btn btn-primary">Categories</Link>
        <Link to="/admin/colors" className="Menu-Item btn btn-primary">Colors</Link>
        <Link to="/admin/sizes" className="Menu-Item btn btn-primary">Sizes</Link>
      </div>
    </div>
  )
}

export default Dashboard;
