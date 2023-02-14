import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';

import Categories from './Categories/Categories';
import Category from './Categories/Category';

import SubCategories from './SubCategories/SubCategories';
import SubCategory from './SubCategories/SubCategory';

import Products from './Products/Products';
import Product from './Products/Product';

import Colors from './Colors/Colors';
import Color from './Colors/Color';

import Sizes from './Sizes/Sizes';
import Size from './Sizes/Size';

import './Admin.scss';

const Admin = () => {
  return (
    <div className="Admin">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="categories/:categoryId/sub_categories/:subCategoryId/products/:id" element={<Product />} />
        <Route path="categories/:categoryId/sub_categories/:subCategoryId/products" element={<Products />} />

        <Route path="categories/:categoryId/sub_categories/:id" element={<SubCategory />} />
        <Route path="categories/:categoryId/sub_categories" element={<SubCategories />} />

        <Route path="categories/:id" element={<Category />} />
        <Route path="categories" element={<Categories />} />

        <Route path="colors/:id" element={<Color />} />
        <Route path="colors" element={<Colors />} />

        <Route path="sizes/:id" element={<Size />} />
        <Route path="sizes" element={<Sizes />} />
      </Routes>
    </div>
  )
}

export default Admin;
