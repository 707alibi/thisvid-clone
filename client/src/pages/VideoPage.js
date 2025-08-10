import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoList from '../components/VideoList';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/videos/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setVideo(data.data);
        setRelatedVideos(data.data.relatedVideos || []);
      } else {
        setError(data.error || 'Video not found');
      }
    } catch (err) {
      setError('Failed to fetch video');
      console.error('Error fetching video:', err);
    } finally {
      setLoading(false);
    }
  };

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="container">
        <div className="error">
          <h2>Video Not Found</h2>
          <p>The video you're looking for doesn't exist.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="video-page-content">
        <div className="video-main">
          <div className="video-player-container">
            <video 
              className="video-player" 
              controls 
              poster={video.thumbnailUrl}
              onError={(e) => {
                console.error('Video failed to load:', e);
              }}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="video-details">
            <h1 className="video-title-large">{video.title}</h1>
            
            <div className="video-stats">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>Uploaded {formatDate(video.uploadDate)}</span>
              <span>•</span>
              <span className="video-category">{video.category}</span>
            </div>

            <div className="video-description">
              <p>{video.description}</p>
            </div>

            {video.tags && video.tags.length > 0 && (
              <div className="video-tags">
                <h4>Tags:</h4>
                <div className="tags-list">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="comments-section">
            <h3>Comments</h3>
            <div className="comments-placeholder">
              <p>Comments feature coming soon! Join our community to share your thoughts.</p>
            </div>
          </div>
        </div>

        <aside className="video-sidebar">
          {relatedVideos.length > 0 && (
            <div className="related-videos">
              <h3 className="related-title">Related Videos</h3>
              <VideoList videos={relatedVideos} />
            </div>
          )}
          
          <div className="ad-banner">
            <h4>Advertisement</h4>
            <p>Discover more amazing content! Your ad could be here.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VideoPage;
