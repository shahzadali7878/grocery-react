import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { clearColors, fetchColors, deleteColor } from '../../../Actions/ColorsActions';

import Confirm from '../../Confirm/Confirm';

const mapStateToProps = (state) => ({
  colors: state.colors
});

const mapDispatchToProps = (dispatch) => ({
  clearColors: () => dispatch(clearColors()),
  fetchColors: () => dispatch(fetchColors()),
  deleteColor: (colorId) => dispatch(deleteColor(colorId))
});

const Colors = ({ colors, clearColors, fetchColors, deleteColor }) => {
  const [loadingColors, setLoadingColors] = useState(true);
  const [colorErrors, setColorErrors] = useState(null);

  useEffect(() => {
    clearColors();
    fetchColors().then(res => {
      setLoadingColors(false);
      setColorErrors(res.errors ? res.errors : null);
    });
  }, [clearColors, fetchColors]);

  const renderContent = () => {
    if (loadingColors)
      return 'Loading...'

    if (colorErrors)
      return <div className="alert alert-danger mt-3">{colorErrors}</div>

    if (Object.keys(colors).length === 0)
      return <div className="alert alert-info mt-3">No Colors!</div>

    return (
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(colors)
                .sort((a, b) => a.id < b.id ? 1 : -1)
                .map((color, index) => (
                <tr key={`color-${index}`}>
                  <td>{color.name}</td>
                  <td>{color.code}</td>
                  <td>
                    <Link to={`/admin/colors/${color.id}`} className="btn btn-primary me-1">Edit</Link>
                    <Confirm
                      yes={() => deleteColor(color.id)}
                      text="Delete"
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="Colors">
      <div className="container mt-3">
        <Link to="/admin/colors/new" className="btn btn-primary mb-1">New Color</Link>

        {renderContent()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Colors);
