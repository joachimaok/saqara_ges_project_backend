# Backend API for Project Management

## Description
This is the backend API for the project management application. It is built with NestJS and provides endpoints for user authentication, project management, and task management.

## Features
- User Registration and Login
- JWT Authentication
- CRUD operations for Projects
- CRUD operations for Tasks
- Swagger documentation

## Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (optional, if running without Docker)

## Installation

### Clone the repository
```bash
git clone https://github.com/joachimaok/saqara_ges_project_backend.git
cd your-repo
```

## Environment Variables
Use files `env/.env.${process.env.ENV}` or `env/.env.default` in the root directory and configure the following environment variables:

```
MONGO_URI=mongodb://your-mongo-url:27017/your-database
JWT_SECRET=your-secret-key
JWT_EXPIRES=1d
```

## Running with Docker
Make sure Docker and Docker Compose are installed on your machine.

### 1. Build and start the Docker containers:

```bash
docker compose up --build
```

### 2. Stop the Docker containers:

```bash
docker compose down
```

## Running without Docker

### 1. Install dependencies:

```bash
pnpm install
```

### 2. Run the application:

```bash
pnpm start:dev
```

# Usage

## Swagger Documentation

Once the application is running, you can access the API documentation at:

```bash
http://localhost:3000/api
```

## Endpoints

- Auth

  - POST `/auth/register` - Register a new user
  - POST `/auth/login` - Login a user and get a JWT token

- Projects

  - GET `/projects` - Get all projects for the authenticated user
  - POST `/projects` - Create a new project
  - PUT `/projects/:id` - Update a project by ID
  - DELETE `/projects/:id` - Delete a project by ID

- Tasks

  - GET `/tasks` - Get all tasks for the authenticated user
  - POST `/tasks` - Create a new task
  - PUT `/tasks/:id` - Update a task by ID
  - PATCH `/tasks/:id/complete` - Mark a task as complete by ID
  - DELETE `/tasks/:id` - Delete a task by ID

# Running Tests

To run tests, use the following command:

```bash
pnpm test
```