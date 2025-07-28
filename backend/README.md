# DevTasks – Developer Progress Tracker

DevTasks is a full-stack web app that helps developers track and gamify their coding journey — including DSA, Development, GitHub contributions, and Competitive Programming.  
It features real-time leaderboards, XP systems, streak tracking, and goal setting.

# Tech Stack

- Frontend: React, Tailwind CSS  
- Backend: Node.js, Express.js, MongoDB, JWT  
- Deployment: [Coming Soon]


## Project Structure
devtasks/
├── backend/
│ ├── controllers/ Logic for routes
│ ├── routes/ API endpoints (auth, progress, leaderboard)
│ ├── models/ Mongoose schemas (User, Progress)
│ ├── middleware/ Auth middleware (JWT), error handlers
│ ├── utils/ Optional: helper functions
│ ├── server.js Main Express app
│ └── .env Environment variables (gitignored)
├── frontend/ React frontend (coming soon)
├── README.md
└── .gitignore