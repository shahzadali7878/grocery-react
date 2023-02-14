import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { clearSizes, fetchSizes, deleteSize } from '../../../Actions/SizesActions';

import Confirm from '../../Confirm/Confirm';

const mapStateToProps = (state) => ({
  sizes: state.sizes
});

const mapDispatchToProps = (dispatch) => ({
  clearSizes: () => dispatch(clearSizes()),
  fetchSizes: () => dispatch(fetchSizes()),
  deleteSize: (sizeId) => dispatch(deleteSize(sizeId))
});

const Sizes = ({ sizes, clearSizes, fetchSizes, deleteSize }) => {
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [sizeErrors, setSizeErrors] = useState(null);

  useEffect(() => {
    clearSizes();
    fetchSizes().then(res => {
      setLoadingSizes(false);
      setSizeErrors(res.errors ? res.errors : null);
    });
  }, [clearSizes, fetchSizes]);

  const renderContent = () => {
    if (loadingSizes)
      return 'Loading...'

    if (sizeErrors)
      return <div className="alert alert-danger mt-3">{sizeErrors}</div>

    if (Object.keys(sizes).length === 0)
      return <div className="alert alert-info mt-3">No Sizes!</div>

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
              Object.values(sizes)
                .sort((a, b) => a.id < b.id ? 1 : -1)
                .map((size, index) => (
                <tr key={`size-${index}`}>
                  <td>{size.name}</td>
                  <td>{size.code}</td>
                  <td>
                    <Link to={`/admin/sizes/${size.id}`} className="btn btn-primary me-1">Edit</Link>
                    <Confirm
                      yes={() => deleteSize(size.id)}
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
    <div className="Sizes">
      <div className="container mt-3">
        <Link to="/admin/sizes/new" className="btn btn-primary mb-1">New Size</Link>

        {renderContent()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sizes);
