import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { createCategory, updateCategory } from '../../../Actions/CategoriesActions';

import ShowNotice from '../../Notice/Notice';

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  createCategory: (category) => dispatch(createCategory(category)),
  updateCategory: (category) => dispatch(updateCategory(category))
});

const Category = ({ categories, createCategory, updateCategory }) => {
  const { id } = useParams();
  const category = categories[id];

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [categoryAttributes, setCategoryAttributes] = useState(category ? {
      id: category.id, name: category.name, description: category.description
    } : {
      name: '', description: ''
    }
  );

  const handleFieldChange = (field, value) => (
    setCategoryAttributes({ ...categoryAttributes, [field]: value })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true)

    if (category) {
      updateCategory(categoryAttributes).then(res => handleSubmitResponse(res));
    } else {
      createCategory(categoryAttributes).then(res => handleSubmitResponse(res));
    }
  }

  const handleSubmitResponse = (res) => {
    setSubmitting(false);

    if (res.errors) {
      setNotice({ type: 'danger', message: res.errors });
    } else {
      setNotice({ type: 'success', message: 'Category is saved successfully!' });
    }
  }

  return (
    <div className="container mt-3">
      <h3>{category ? 'Edit Category' : 'Create Category'}</h3>

      <ShowNotice notice={notice} />

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={categoryAttributes.name}
            onChange={e => handleFieldChange('name', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            value={categoryAttributes.description}
            onChange={e => handleFieldChange('description', e.currentTarget.value)}
          />
        </div>

        <button
          className="Save-Category btn btn-success"
          disabled={submitting}
          onClick={e => handleSubmit(e)}
        >
          Submit
        </button>
        <Link to="/admin/categories" className="Back-Btn btn btn-danger ms-1">Back</Link>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
