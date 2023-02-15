import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { clearSubCategories, fetchSubCategories, deleteSubCategory } from '../../../Actions/SubCategoriesActions';

import Confirm from '../../Confirm/Confirm';

const mapStateToProps = (state) => ({
  categories: state.categories,
  subCategories: state.subCategories
});

const mapDispatchToProps = (dispatch) => ({
  clearSubCategories: () => dispatch(clearSubCategories()),
  fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
  deleteSubCategory: (categoryId, subCategoryId) => dispatch(deleteSubCategory(categoryId, subCategoryId))
});

const Categories = ({ categories, subCategories, clearSubCategories, fetchSubCategories, deleteSubCategory }) => {
  const { categoryId } = useParams();
  const category = categories[categoryId];

  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [subCategoryErrors, setSubCategoryErrors] = useState(null);

  useEffect(() => {
    clearSubCategories();
    fetchSubCategories(category.id).then(res => {
      setLoadingSubCategories(false);
      setSubCategoryErrors(res.errors ? res.errors : null);
    });
  }, [clearSubCategories, fetchSubCategories, category.id]);

  const renderContent = () => {
    if (loadingSubCategories)
      return 'Loading...'

    if (subCategoryErrors)
      return <div className="alert alert-danger mt-3">{subCategoryErrors}</div>

    if (Object.keys(subCategories).length === 0)
      return <div className="alert alert-info mt-3">No SubCategories!</div>

    return (
      <div className="table-responsive">
        <table className="List-SubCategories table">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(subCategories)
                .sort((a, b) => a.id < b.id ? 1 : -1)
                .map((subCategory, index) => (
                <tr key={`subCategory-${index}`}>
                  <td>{subCategory.name}</td>
                  <td>{subCategory.description}</td>
                  <td>
                    <Link
                      to={`/admin/categories/${category.id}/sub_categories/${subCategory.id}`}
                      className="Edit-SubCategory btn btn-primary me-1"
                    >
                      Edit
                    </Link>
                    <Confirm
                      yes={() => deleteSubCategory(category.id, subCategory.id)}
                      text="Delete"
                    />
                    <Link
                      to={`/admin/categories/${category.id}/sub_categories/${subCategory.id}/products`}
                      className="Link-Products btn btn-primary ms-1"
                    >
                      Products
                    </Link>
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
    <div className="SubCategories">
      <div className="container mt-3">
        <Link
          to={`/admin/categories/${category.id}/sub_categories/new`}
          className="New-SubCategory btn btn-primary mb-1"
        >
          New SubCategory
        </Link>

        {renderContent()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
