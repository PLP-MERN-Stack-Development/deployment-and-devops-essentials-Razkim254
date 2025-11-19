# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
















💬 Socket.io Chat App
A full-stack real-time chat application built with React, Express, and Socket.io, featuring global and private messaging, file sharing, notifications, and performance optimizations. Designed for scalability, modularity, and smooth UX across devices.

🚀 Features
🔧 Core Functionality
Real-time bidirectional communication using Socket.io

Global chat room with live messaging

Simple username-based authentication

Online/offline user status

Typing indicators

💬 Advanced Chat
Private messaging between users

Multiple chat rooms/channels

File and image sharing with previews

Read receipts and message reactions

🔔 Notifications
Sound and browser notifications for new messages

Join/leave room alerts

Unread message count tracking

⚙️ Performance & UX
Message pagination for older chats

Reconnection logic for network drops

Namespaces and rooms for scalable socket handling

Message delivery acknowledgment

Searchable message history

Responsive design for desktop and mobile

🧱 Folder Structure
Code
socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files (favicon, notification.mp3)
│   ├── src/
│   │   ├── components/     # UI components (ChatBox, FileUpload, FilePreview)
│   │   ├── context/        # React context providers (AuthContext, ChatContext)
│   │   ├── hooks/          # Custom hooks (useNotifications)
│   │   ├── pages/          # Page components (Login, ChatRoom)
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files (env, DB)
│   ├── controllers/        # Socket event handlers (chatController, fileController)
│   ├── models/             # Mongoose models (User, Message)
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions (formatMessage, auth)
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
🛠️ Setup Instructions
Prerequisites
Node.js v18+

MongoDB (local or Atlas)

Git

Clone the repository
bash
git clone https://github.com/your-username/socketio-chat.git
cd socketio-chat
Server Setup
bash
cd server
npm install
touch .env
.env

Code
PORT=5000
MONGO_URI=your_mongodb_connection_string
bash
npm run dev
Client Setup
bash
cd ../client
npm install
npm start
🧪 Testing
Open multiple browser tabs or devices

Enter different usernames to simulate users

Test global and private messaging

Upload files and verify previews

Observe notifications and unread counts

📦 Deployment
Server
Deploy to Render, Railway, or Heroku

Client
Deploy to Vercel, Netlify, or GitHub Pages

Add deployed URLs to your README:

md
🔗 Live Client: https://your-client-url.vercel.app  
🔗 Live Server: https://your-server-url.onrender.com
📸 Screenshots
Include screenshots or GIFs showing:

Global chat in action

Private messaging

File/image sharing

Notifications and reactions

📚 Technologies Used
Frontend: React, React Router, Context API, CSS Modules

Backend: Express, Socket.io, Mongoose

Real-Time: Socket.io namespaces, rooms, events

Notifications: Web Notifications API, Audio

Deployment: Vercel, Render

🙌 Credits
Built by Raz