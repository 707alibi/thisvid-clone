import React, { useState, useEffect } from 'react';

const Categories = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/videos/meta/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.error || 'Failed to fetch categories');
      }
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="categories-sidebar">
        <h3 className="categories-title">CATEGORIES</h3>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-sidebar">
        <h3 className="categories-title">CATEGORIES</h3>
        <div className="error">
          <p>Error loading categories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-sidebar">
      <h3 className="categories-title">CATEGORIES</h3>
      <ul className="categories-list">
        <li className="category-item">
          <button
            onClick={() => onCategoryChange('all')}
            className={`category-link ${selectedCategory === 'all' ? 'active' : ''}`}
          >
            <span>All Videos</span>
            <span className="category-count">
              {categories.reduce((total, cat) => total + cat.count, 0)}
            </span>
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.name} className="category-item">
            <button
              onClick={() => onCategoryChange(category.name)}
              className={`category-link ${selectedCategory === category.name ? 'active' : ''}`}
            >
              <span>{category.name}</span>
              <span className="category-count">{category.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
