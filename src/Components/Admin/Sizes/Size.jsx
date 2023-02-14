import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { createSize, updateSize } from '../../../Actions/SizesActions';

import ShowNotice from '../../Notice/Notice';

const mapStateToProps = (state) => ({
  sizes: state.sizes
});

const mapDispatchToProps = (dispatch) => ({
  createSize: (size) => dispatch(createSize(size)),
  updateSize: (size) => dispatch(updateSize(size))
});

const Size = ({ sizes, createSize, updateSize }) => {
  const { id } = useParams();
  const size = sizes[id];

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [sizeAttributes, setSizeAttributes] = useState(size ? {
      id: size.id, name: size.name, code: size.code
    } : {
      name: '', code: ''
    }
  );

  const handleFieldChange = (field, value) => (
    setSizeAttributes({ ...sizeAttributes, [field]: value })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (size) {
      updateSize(sizeAttributes).then(res => handleSubmitResponse(res));
    } else {
      createSize(sizeAttributes).then(res => handleSubmitResponse(res));
    }
  }

  const handleSubmitResponse = (res) => {
    setSubmitting(false);

    if (res.errors) {
      setNotice({ type: 'danger', message: res.errors });
    } else {
      setNotice({ type: 'success', message: 'Size is saved successfully!' });
    }
  }

  return (
    <div className="container mt-3">
      <h3>{size ? 'Edit Size' : 'Create Size'}</h3>

      <ShowNotice notice={notice} />

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={sizeAttributes.name}
            onChange={e => handleFieldChange('name', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Code"
            value={sizeAttributes.code}
            onChange={e => handleFieldChange('code', e.currentTarget.value)}
          />
        </div>

        <button
          className="btn btn-success"
          disabled={submitting}
          onClick={e => handleSubmit(e)}
        >
          Submit
        </button>
        <Link to="/admin/sizes" className="btn btn-danger ms-1">Back</Link>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Size);
