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
  ```env
backend env
PORT=8000
MONGO_URI=<Your MongoDB connection string>
SALT=10
JWT_SECRET=<Your JWT secret>
CLIENT_URL=http://localhost:5173

frontend env
VITE_API_URL=http://localhost:8000
```


4. **Start the Backend Server**:
   npm run dev
   
5. **Start the Frontend Server**:
   npm run dev



## Postman Collection & Environment

### To test all API endpoints and verify functionality:

- **Postman Collection:** [PrimeTrade.ai assignment api.postman_collection](https://drive.google.com/file/d/1bsxWIQ0Xc0xqVJwjSQOLMrrI-TDQdG_O/uc?export=download)

- Includes all requests for Auth, Users, and Tasks

- Each request has tests included (status checks, variable storage)

- **Postman Environment:** [primetrade.ai environment.postman_environment](https://drive.google.com/file/d/1JD8PGrUNDlYkkoou6uryz_RBIBGYfUfO/uc?export=download)

#### Variables included:

- **base_url** → e.g., http://localhost:5000/api

### Steps to Run:

- Import both the collection and environment into Postman

- Select the environment (AnythingAI-env)

-- Update base_url if your backend runs on a different URL

### Run requests in this order:

Auth → Register

Auth → Login

Users → Get Profile

Users → Update Profile

Tasks → Create Task

Tasks → Get Tasks

Tasks → Update Task

Tasks → Delete Task

TASK_ID is automatically set by the Create Task request for use in subsequent task requests
















