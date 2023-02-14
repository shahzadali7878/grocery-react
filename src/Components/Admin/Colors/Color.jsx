import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { createColor, updateColor } from '../../../Actions/ColorsActions';

import ShowNotice from '../../Notice/Notice';

const mapStateToProps = (state) => ({
  colors: state.colors
});

const mapDispatchToProps = (dispatch) => ({
  createColor: (color) => dispatch(createColor(color)),
  updateColor: (color) => dispatch(updateColor(color))
});

const Color = ({ colors, createColor, updateColor }) => {
  const { id } = useParams();
  const color = colors[id];

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [colorAttributes, setColorAttributes] = useState(color ? {
      id: color.id, name: color.name, code: color.code
    } : {
      name: '', code: ''
    }
  );

  const handleFieldChange = (field, value) => (
    setColorAttributes({ ...colorAttributes, [field]: value })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true)

    if (color) {
      updateColor(colorAttributes).then(res => handleSubmitResponse(res));
    } else {
      createColor(colorAttributes).then(res => handleSubmitResponse(res));
    }
  }

  const handleSubmitResponse = (res) => {
    setSubmitting(false);

    if (res.errors) {
      setNotice({ type: 'danger', message: res.errors });
    } else {
      setNotice({ type: 'success', message: 'Color is saved successfully!' });
    }
  }

  return (
    <div className="container mt-3">
      <h3>{color ? 'Edit Color' : 'Create Color'}</h3>

      <ShowNotice notice={notice} />

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={colorAttributes.name}
            onChange={e => handleFieldChange('name', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Code"
            value={colorAttributes.code}
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
        <Link to="/admin/colors" className="btn btn-danger ms-1">Back</Link>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Color);
