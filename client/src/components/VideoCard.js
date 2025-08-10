import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Link to={`/video/${video.id}`} className="video-card">
      <div className="video-thumbnail">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="video-duration">{video.duration}</div>
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <div className="video-meta">
          <span className="video-views">{formatViews(video.views)} views</span>
          <span className="video-date">{formatDate(video.uploadDate)}</span>
        </div>
        <div className="video-category">{video.category}</div>
      </div>
    </Link>
  );
};

export default VideoCard;
