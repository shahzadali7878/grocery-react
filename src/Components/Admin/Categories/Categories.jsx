import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { clearCategories, fetchCategories, deleteCategory } from '../../../Actions/CategoriesActions';

import Confirm from '../../Confirm/Confirm';

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  clearCategories: () => dispatch(clearCategories()),
  fetchCategories: () => dispatch(fetchCategories()),
  deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId))
});

const Categories = ({ categories, clearCategories, fetchCategories, deleteCategory }) => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryErrors, setCategoryErrors] = useState(null);

  useEffect(() => {
    clearCategories();
    fetchCategories().then(res => {
      setLoadingCategories(false);
      setCategoryErrors(res.errors ? res.errors : null);
    });
  }, [clearCategories, fetchCategories]);

  const renderContent = () => {
    if (loadingCategories)
      return 'Loading...'

    if (categoryErrors)
      return <div className="alert alert-danger mt-3">{categoryErrors}</div>

    if (Object.keys(categories).length === 0)
      return <div className="alert alert-info mt-3">No Categories!</div>

    return (
      <div className="table-responsive">
        <table className="List-Categories table">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(categories)
                .sort((a, b) => a.id < b.id ? 1 : -1)
                .map((category, index) => (
                <tr key={`category-${index}`}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Link
                      to={`/admin/categories/${category.id}`}
                      className="Edit-Category btn btn-primary me-1"
                    >
                      Edit
                    </Link>
                    <Confirm
                      yes={() => deleteCategory(category.id)}
                      text="Delete"
                    />
                    <Link
                      to={`/admin/categories/${category.id}/sub_categories`}
                      className="Link-SubCategories btn btn-primary ms-1"
                    >
                      SubCategories
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
    <div className="Categories">
      <div className="container mt-3">
        <Link to="/admin/categories/new" className="New-Category btn btn-primary mb-1">New Category</Link>

        {renderContent()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
