import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { clearProducts, fetchProducts, deleteProduct } from '../../../Actions/ProductsActions';

import Confirm from '../../Confirm/Confirm';

const mapStateToProps = (state) => ({
  categories: state.categories,
  subCategories: state.subCategories,
  products: state.products
});

const mapDispatchToProps = (dispatch) => ({
  clearProducts: () => dispatch(clearProducts()),
  fetchProducts: (categoryId, subCategoryId) => dispatch(fetchProducts(categoryId, subCategoryId)),
  deleteProduct: (categoryId, subCategoryId, productId) => dispatch(deleteProduct(categoryId, subCategoryId, productId))
});

const Categories = ({ categories, subCategories, products, clearProducts, fetchProducts, deleteProduct }) => {
  const { categoryId, subCategoryId } = useParams();
  const category = categories[categoryId];
  const subCategory = subCategories[subCategoryId];

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productErrors, setProductErrors] = useState(null);

  useEffect(() => {
    clearProducts();
    fetchProducts(category.id, subCategory.id).then(res => {
      setLoadingProducts(false);
      setProductErrors(res.errors ? res.errors : null);
    });
  }, [clearProducts, fetchProducts, category.id, subCategory.id]);

  const renderContent = () => {
    if (loadingProducts)
      return 'Loading...'

    if (productErrors)
      return <div className="alert alert-danger mt-3">{productErrors}</div>

    if (Object.keys(products).length === 0)
      return <div className="alert alert-info mt-3">No Products!</div>

    return (
      <div className="table-responsive">
        <table className="List-Products table">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discounted Price</th>
              <th>On Sale</th>
              <th>Colors</th>
              <th>Sizes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(products)
                .sort((a, b) => a.id < b.id ? 1 : -1)
                .map((product, index) => (
                <tr key={`product-${index}`}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.discounted_price}</td>
                  <td>{product.on_sale ? 'Yes' : 'No'}</td>
                  <td>{product.colors.map(clr => clr.name).join(', ')}</td>
                  <td>{product.sizes.map(sz => sz.name).join(', ')}</td>
                  <td>
                    <Link
                      to={`/admin/categories/${category.id}/sub_categories/${subCategory.id}/products/${product.id}`}
                      className="Edit-Product btn btn-primary me-1"
                    >
                      Edit
                    </Link>
                    <Confirm
                      yes={() => deleteProduct(category.id, subCategory.id, product.id)}
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
    <div className="Products">
      <div className="container mt-3">
        <Link
          to={`/admin/categories/${category.id}/sub_categories/${subCategory.id}/products/new`}
          className="New-Product btn btn-primary mb-1"
        >
          New Product
        </Link>

        {renderContent()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
