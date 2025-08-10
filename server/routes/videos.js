const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Load videos data
const loadVideos = () => {
  try {
    const videosPath = path.join(__dirname, '../data/videos.json');
    const videosData = fs.readFileSync(videosPath, 'utf8');
    return JSON.parse(videosData);
  } catch (error) {
    console.error('Error loading videos:', error);
    return [];
  }
};

// Get all videos
router.get('/', (req, res) => {
  try {
    const videos = loadVideos();
    const { category, limit } = req.query;
    
    let filteredVideos = videos;
    
    // Filter by category if provided
    if (category && category !== 'all') {
      filteredVideos = videos.filter(video => 
        video.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Limit results if specified
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredVideos = filteredVideos.slice(0, limitNum);
      }
    }
    
    res.json({
      success: true,
      count: filteredVideos.length,
      data: filteredVideos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch videos'
    });
  }
});

// Get single video by ID
router.get('/:id', (req, res) => {
  try {
    const videos = loadVideos();
    const video = videos.find(v => v.id === req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }
    
    // Get related videos (same category, excluding current video)
    const relatedVideos = videos
      .filter(v => v.category === video.category && v.id !== video.id)
      .slice(0, 4);
    
    res.json({
      success: true,
      data: {
        ...video,
        relatedVideos
      }
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch video'
    });
  }
});

// Search videos
router.get('/search/query', (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const videos = loadVideos();
    const searchTerm = query.toLowerCase().trim();
    
    const results = videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.category.toLowerCase().includes(searchTerm) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    res.json({
      success: true,
      query: query,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error searching videos:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search videos'
    });
  }
});

// Get categories
router.get('/meta/categories', (req, res) => {
  try {
    const videos = loadVideos();
    const categories = [...new Set(videos.map(video => video.category))];
    
    const categoriesWithCounts = categories.map(category => ({
      name: category,
      count: videos.filter(video => video.category === category).length
    }));
    
    res.json({
      success: true,
      data: categoriesWithCounts
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

module.exports = router;
