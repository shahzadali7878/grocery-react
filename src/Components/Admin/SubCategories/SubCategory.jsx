import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { createSubCategory, updateSubCategory } from '../../../Actions/SubCategoriesActions';

import ShowNotice from '../../Notice/Notice';

const mapStateToProps = (state) => ({
  categories: state.categories,
  subCategories: state.subCategories
});

const mapDispatchToProps = (dispatch) => ({
  createSubCategory: (categoryId, subCategory) => dispatch(createSubCategory(categoryId, subCategory)),
  updateSubCategory: (categoryId, subCategory) => dispatch(updateSubCategory(categoryId, subCategory))
});

const SubCategory = ({ categories, subCategories, createSubCategory, updateSubCategory }) => {
  const { categoryId, id } = useParams();
  const category = categories[categoryId];
  const subCategory = subCategories[id];

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [subCategoryAttributes, setSubCategoryAttributes] = useState(subCategory ? {
      id: subCategory.id, name: subCategory.name, description: subCategory.description
    } : {
      name: '', description: ''
    }
  );

  const handleFieldChange = (field, value) => (
    setSubCategoryAttributes({ ...subCategoryAttributes, [field]: value })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true)

    if (subCategory) {
      updateSubCategory(category.id, subCategoryAttributes).then(res => handleSubmitResponse(res));
    } else {
      createSubCategory(category.id, subCategoryAttributes).then(res => handleSubmitResponse(res));
    }
  }

  const handleSubmitResponse = (res) => {
    setSubmitting(false);

    if (res.errors) {
      setNotice({ type: 'danger', message: res.errors });
    } else {
      setNotice({ type: 'success', message: 'SubCategory is saved successfully!' });
    }
  }

  return (
    <div className="container mt-3">
      <h3>{subCategory ? 'Edit SubCategory' : 'Create SubCategory'}</h3>

      <ShowNotice notice={notice} />

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={subCategoryAttributes.name}
            onChange={e => handleFieldChange('name', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={subCategoryAttributes.description}
            onChange={e => handleFieldChange('description', e.currentTarget.value)}
          />
        </div>

        <button
          className="btn btn-success"
          disabled={submitting}
          onClick={e => handleSubmit(e)}
        >
          Submit
        </button>
        <Link to={`/admin/categories/${category.id}/sub_categories`} className="btn btn-danger ms-1">Back</Link>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
