# Event Management Platform

A full-stack event management application built with React, Node.js, Express, and MongoDB.

## Features

- Create and manage events
- Browse upcoming events
- User registration and authentication
- Event registration

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Custom JWT (to be implemented)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/eventdb?retryWrites=true&w=majority
VITE_API_URL=http://localhost:5000/api
```

Replace the MongoDB URI with your actual connection string.

### Installation

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

3. In a separate terminal, start the backend server:
```
npm run server
```

## MongoDB Connection

The application connects to MongoDB using Mongoose. The connection string is stored in the `.env` file as `MONGODB_URI`.

## Project Structure

- `/src` - Frontend React application
- `/server` - Backend Express API
  - `/models` - Mongoose models
  - `/routes` - API routes
- `/public` - Static assets

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event
- `POST /api/events/:id/register` - Register for an event

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile/:id` - Get user profile

## Deployment

For production deployment:

1. Build the frontend:
```
npm run build
```

2. Start the production server:
```
NODE_ENV=production npm run server
```

The server will serve the static files from the `dist` directory.