import React, { useState, useEffect } from 'react';
import VideoList from '../components/VideoList';
import Categories from '../components/Categories';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = selectedCategory === 'all' 
        ? '/api/videos' 
        : `/api/videos?category=${encodeURIComponent(selectedCategory)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setVideos(data.data);
      } else {
        setError(data.error || 'Failed to fetch videos');
      }
    } catch (err) {
      setError('Failed to fetch videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container">
      <div className="homepage-header">
        <h1 className="page-title">
          WELCOME TO THE <span style={{ color: '#e91e63' }}>THIS</span>VID - #1 PLACE FOR YOUR VIDEOS
        </h1>
        <p className="page-subtitle">
          SHOWING {videos.length} OF {videos.length} VIDEOS
        </p>
      </div>

      <div className="homepage-content">
        <div className="main-content-area">
          <div className="content-header">
            <h2>MOST RECENT VIDEOS</h2>
            <div className="filter-options">
              <select 
                value={selectedCategory} 
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-input"
                style={{ width: 'auto', marginLeft: '16px' }}
              >
                <option value="all">All Categories</option>
                <option value="Nature">Nature</option>
                <option value="Cooking">Cooking</option>
                <option value="Photography">Photography</option>
                <option value="Fitness">Fitness</option>
                <option value="Travel">Travel</option>
                <option value="Music">Music</option>
                <option value="DIY">DIY</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
          </div>

          <VideoList 
            videos={videos} 
            loading={loading} 
            error={error} 
          />
        </div>

        <aside className="sidebar">
          <Categories 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          <div className="ad-banner" style={{ 
            marginTop: '24px', 
            padding: '20px', 
            backgroundColor: '#1a1a1a', 
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#e91e63', marginBottom: '12px' }}>Advertisement</h4>
            <p style={{ color: '#999', fontSize: '14px' }}>
              Your ad could be here! Contact us for advertising opportunities.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
