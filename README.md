# Task App

A **React-based task management dashboard** with full CRUD functionality, search, date filtering, and pagination. The app uses **React Query** for data fetching and cache management, and **Tailwind CSS** for styling. Users can add, edit, delete, and mark tasks as complete, with smooth loading and infinite scroll support.

---

## Features

- Add, edit, and delete tasks
- Toggle task completion
- Search tasks by title
- Filter tasks by creation date
- Pagination with "Load More" button
- Optimistic UI updates for faster experience
- Loading skeletons while fetching data
- Responsive and clean UI
- User authentication with logout support

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Query
- **State Management:** React Context (Auth)
- **API:** Axios
- **Backend (node/express):** REST API endpoints (`/tasks`) for CRUD operations



## Installation

### Prerequisites
- Node.js v18+
- npm or Yarn
- Git
- A running backend API for /tasks endpoints

### Steps

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd task-dashboard
2. **Install dependencies**:
   npm install
   # or
   yarn install

3. **Configure environment variables**:
  ```backend env
PORT=8000
MONGO_URI=<Your MongoDB connection string>
SALT=10
JWT_SECRET=<Your JWT secret>
CLIENT_URL=http://localhost:5173

```frontend env
VITE_API_URL=http://localhost:8000





















