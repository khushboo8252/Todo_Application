# 📝 Todo Dashboard (MERN Stack)

A full-featured Todo App built with the **MERN Stack** (MongoDB, Express, React, Node.js). It includes user authentication, priority-based todo management, note-taking, dark/light mode, and responsive design using Tailwind CSS.

---

## 🚀 Features

- ✅ User Signup/Login (JWT Authentication)
- ✅ Add, Edit, and Delete Todos
- ✅ Add Notes to individual Todos
- ✅ Filter Todos by title
- ✅ Dark/Light Theme Toggle 🌗
- ✅ Protected Routes for authenticated users
- ✅ Responsive Layout with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React
- 🎨 Tailwind CSS
- 🔁 React Router DOM

### Backend

- 🟢 Node.js
- ⚙️ Express.js
- 🍃 MongoDB
- 🔐 JWT (Authentication)

---

## 📁 Project Structure

```bash
client/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── AddTodo.jsx
│   │   ├── UpdateTodo.jsx
│   │   ├── TodoList.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── PrivateComponent.jsx
│   ├── App.jsx
│   └── index.js

server/
├── controllers/
├── models/
├── routes/
├── middleware/
└── server.js

📦 Installation
Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start
🧪 Testing the App
🔑 Visit: http://localhost:3000/signup to register.

🔐 Log in at: http://localhost:3000/login.

📋 Access the Todo Dashboard at /todos.

➕ Add, ✏️ edit, and 🗑️ delete todos.

📝 Add notes to each todo.

🌗 Toggle between Dark and Light mode.
