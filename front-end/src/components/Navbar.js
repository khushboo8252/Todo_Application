import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle dark class on HTML tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">Todo Dashboard</h1>

        <div className="flex items-center gap-4">
          <ul className="flex flex-col sm:flex-row gap-4 text-sm sm:text-base items-center">
            {user ? (
              <>
                <li>
                  <Link
                    to="/todos"
                    className="hover:text-yellow-300 transition duration-200"
                  >
                    Todos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add"
                    className="hover:text-yellow-300 transition duration-200"
                  >
                    Add Todo
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-red-300 hover:text-red-500 transition duration-200"
                  >
                    Logout ({user.name || "User"})
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-yellow-300 transition duration-200"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-yellow-300 transition duration-200"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* 🌙/☀️ Dark Mode Toggle Button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-sm px-3 py-1 border rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
