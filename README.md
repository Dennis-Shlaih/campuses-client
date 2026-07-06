# Campuses & Students — Client

Frontend for the Campuses & Students fullstack CRUD application, built with React, Vite, TanStack Query, Zustand, and Tailwind CSS.

## Live URL

https://campuses-client.vercel.app

## Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: JavaScript
- **Routing**: React Router
- **Server State**: TanStack Query
- **Client State**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Deployment**: Vercel

## Running Locally

### Prerequisites
- Node.js
- The backend server running locally or deployed

### Setup

1. Clone the repo:
```bash
git clone https://github.com/Dennis-Shlaih/campuses-client.git
cd campuses-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```bash
VITE_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

## Features

- Full CRUD for both Campuses and Students
- Search campuses by name (Zustand client state)
- Filter students by unenrolled status (Zustand client state)
- Enroll and unenroll students from the Single Campus page
- Change a student's campus from the Edit Student page
- Loading and error states on every fetched view
- 404 page for unmatched routes
- Responsive design for mobile and desktop
