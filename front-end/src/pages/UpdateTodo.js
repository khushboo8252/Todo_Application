import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`https://todoapp-xdlr.onrender.com/api/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch todo");

        const data = await res.json();
        setTitle(data.title || "");
        setTags(Array.isArray(data.tags) ? data.tags.join(", ") : "");
        setPriority(data.priority || "Low");
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load todo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, token]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    const updatedTodo = {
      title: title.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      priority,
    };

    try {
      const res = await fetch(`https://todoapp-xdlr.onrender.com/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTodo),
      });

      if (res.ok) {
        navigate("/todos");
      } else {
        const error = await res.json();
        alert(error.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating todo.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg p-8 rounded-lg shadow-md text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Update Todo</h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter todo title"
              className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 mb-6 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Update Todo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateTodo;
