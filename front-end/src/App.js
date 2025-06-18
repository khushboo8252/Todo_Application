import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Navbar";
import Footer from "./pages/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddTodo from "./pages/AddTodo";
import TodoList from "./pages/TodoList";
import UpdateTodo from "./pages/UpdateTodo";
import PrivateComponent from "./pages/PrivateComponent";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import ThemeProvider

const App = () => {
  const isAuthPage = ["/login", "/signup"].includes(window.location.pathname);

  return (
    <BrowserRouter>
      <ThemeProvider>
        {!isAuthPage && <Nav />}

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateComponent />}>
              <Route path="/todos" element={<TodoList />} />
              <Route path="/add" element={<AddTodo />} />
              <Route path="/update/:id" element={<UpdateTodo />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {!isAuthPage && <Footer />}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
