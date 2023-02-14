import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { createProduct, updateProduct } from '../../../Actions/ProductsActions';
import { clearColors, fetchColors } from '../../../Actions/ColorsActions';
import { clearSizes, fetchSizes } from '../../../Actions/SizesActions';

import ShowNotice from '../../Notice/Notice';

const mapStateToProps = (state) => ({
  categories: state.categories,
  subCategories: state.subCategories,
  products: state.products,
  colors: state.colors,
  sizes: state.sizes
});

const mapDispatchToProps = (dispatch) => ({
  createProduct: (categoryId, subCategoryId, product) => dispatch(createProduct(categoryId, subCategoryId, product)),
  updateProduct: (categoryId, subCategoryId, product) => dispatch(updateProduct(categoryId, subCategoryId, product)),
  clearColors: () => dispatch(clearColors()),
  fetchColors: () => dispatch(fetchColors()),
  clearSizes: () => dispatch(clearSizes()),
  fetchSizes: () => dispatch(fetchSizes())
});

const SubCategory = ({
  categories,
  subCategories,
  products,
  colors,
  sizes,
  createProduct,
  updateProduct,
  clearColors,
  fetchColors,
  clearSizes,
  fetchSizes
}) => {
  const { categoryId, subCategoryId, id } = useParams();
  const category = categories[categoryId];
  const subCategory = subCategories[subCategoryId];
  const product = products[id];

  const [loadingColors, setLoadingColors] = useState(true);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [productAttributes, setProductAttributes] = useState(product ? {
      id: product.id, name: product.name, description: product.description,
      price: product.price, discounted_price: product.discounted_price, on_sale: product.on_sale,
      color_ids: product.colors.map(clr => clr.id),
      size_ids: product.sizes.map(sz => sz.id),
    } : {
      name: '', description: '', price: '', discounted_price: '', on_sale: false, color_ids: [], size_ids: []
    }
  );

  console.log(productAttributes)

  useEffect(() => {
    clearColors();
    fetchColors().then(res => setLoadingColors(false));
  }, [clearColors, fetchColors]);

  useEffect(() => {
    clearSizes();
    fetchSizes().then(res => setLoadingSizes(false));
  }, [clearSizes, fetchSizes]);

  const handleFieldChange = (field, value) => (
    setProductAttributes({ ...productAttributes, [field]: value })
  );

  const handleDependentFieldChange = (dependent, value) => {
    let selectedIds = JSON.parse(JSON.stringify(productAttributes[dependent]));
    let selectedIdIndex = selectedIds.indexOf(value);
    selectedIdIndex === -1 ? selectedIds.push(value) : selectedIds.splice(selectedIdIndex, 1);

    handleFieldChange(dependent, selectedIds);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (product) {
      updateProduct(category.id, subCategory.id, productAttributes).then(res => handleSubmitResponse(res));
    } else {
      createProduct(category.id, subCategory.id, productAttributes).then(res => handleSubmitResponse(res));
    }
  }

  const handleSubmitResponse = (res) => {
    setSubmitting(false);

    if (res.errors) {
      setNotice({ type: 'danger', message: res.errors });
    } else {
      setNotice({ type: 'success', message: 'Product is saved successfully!' });
    }
  }

  if (loadingColors || loadingSizes)
    return 'Loading...';

  return (
    <div className="container mt-3">
      <h3>{product ? 'Edit Product' : 'Create Product'}</h3>

      <ShowNotice notice={notice} />

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={productAttributes.name}
            onChange={e => handleFieldChange('name', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={productAttributes.description}
            onChange={e => handleFieldChange('description', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={productAttributes.price}
            onChange={e => handleFieldChange('price', e.currentTarget.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Discounted Price"
            value={productAttributes.discounted_price}
            onChange={e => handleFieldChange('discounted_price', e.currentTarget.value)}
          />
        </div>

        <hr />

        <div className="On-Sale">
          <span>On Sale</span>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="on-sale-yes"
              checked={productAttributes.on_sale === true}
              onChange={e => handleFieldChange('on_sale', true)}
            />
            <label className="form-check-label" htmlFor="on-sale-yes">
              Yes
            </label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="on-sale-no"
              checked={productAttributes.on_sale === false}
              onChange={e => handleFieldChange('on_sale', false)}
            />
            <label className="form-check-label" htmlFor="on-sale-no">
              No
            </label>
          </div>
        </div>

        <hr />

        <div className="Colors">
          <span>Colors</span>
          {
            Object.values(colors).map((color, index) => (
              <div className="form-check" key={`color-${index}`}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`color-${color.name}`}
                  checked={productAttributes.color_ids.includes(color.id)}
                  onChange={e => handleDependentFieldChange('color_ids', color.id)}
                />
                <label className="form-check-label" htmlFor={`color-${color.name}`}>
                  {color.name}
                </label>
              </div>
            ))
          }
        </div>

        <hr />

        <div className="Sizes mb-3">
          <span>Sizes</span>
          {
            Object.values(sizes).map((size, index) => (
              <div className="form-check" key={`size-${index}`}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`size-${size.name}`}
                  checked={productAttributes.size_ids.includes(size.id)}
                  onChange={e => handleDependentFieldChange('size_ids', size.id)}
                />
                <label className="form-check-label" htmlFor={`size-${size.name}`}>
                  {size.name}
                </label>
              </div>
            ))
          }
        </div>

        <button
          className="btn btn-success"
          disabled={submitting}
          onClick={e => handleSubmit(e)}
        >
          Submit
        </button>
        <Link
          to={`/admin/categories/${category.id}/sub_categories/${subCategory.id}/products`}
          className="btn btn-danger ms-1"
        >
          Back
        </Link>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
