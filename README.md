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
MONGODB_URI=mongodb+srv://alankritsrivastava2k4:<alankrit>@cluster0.hdj9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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
- `POST /api/users/register` - Register a new ![Screenshot 2025-03-01 173922](https://github.com/user-attachments/assets/e4cf0866-8c5e-45a2-8b3f-16c0598210a0)
![Screenshot 2025-03-01 173825](https://github.com/user-attachments/assets/e24959e2-b96e-45a1-a09e-a77aafaa8e24)
user
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
