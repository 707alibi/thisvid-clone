import React from 'react';
import VideoCard from './VideoCard';

const VideoList = ({ videos, loading, error }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading videos: {error}</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="no-videos">
        <h3>No videos found</h3>
        <p>Try adjusting your search or browse different categories.</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
