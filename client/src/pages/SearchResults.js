import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoList from '../components/VideoList';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      searchVideos();
    }
  }, [query]);

  const searchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/videos/search/query?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setVideos(data.data);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err) {
      setError('Failed to search videos');
      console.error('Error searching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <div className="container">
        <div className="search-results">
          <h1>Search Results</h1>
          <p>Please enter a search query.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="search-results">
        <div className="search-header">
          <h1>Search Results</h1>
          <p className="search-query">
            Showing results for: <strong>"{query}"</strong>
          </p>
          {!loading && (
            <p className="search-count">
              Found {videos.length} video{videos.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="search-content">
          <VideoList 
            videos={videos} 
            loading={loading} 
            error={error} 
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
