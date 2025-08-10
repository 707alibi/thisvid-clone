# ThisVid Clone - Video Sharing Platform

A modern video sharing platform built with React and Node.js, inspired by thisvid.com but designed for general content.

## Features

- Modern, responsive video grid layout
- Video player with HTML5 controls
- Search functionality
- Category browsing
- Clean, minimalist design
- Mobile-friendly interface

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Modern CSS with Grid/Flexbox
- Responsive design

**Backend:**
- Node.js
- Express.js
- JSON-based data storage
- RESTful API

## Quick Start

1. Install dependencies:
```bash
npm run install-deps
```

2. Start development servers:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

## Project Structure

```
thisvid-clone/
├── client/          # React frontend
├── server/          # Express backend
└── package.json     # Root package configuration
```

## API Endpoints

- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get specific video
- `GET /api/search?query=` - Search videos
- `GET /api/categories` - Get video categories

## Development

The project uses concurrently to run both frontend and backend servers simultaneously during development.

## License

MIT License
