"use client";

import { PencilOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await fetch("/api/todos");
    const todos_ = await res.json();
    console.log(todos_);
    setTodos(todos_);
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    await getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Welcome to the Todo App
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Manage your tasks easily. Add, edit, or delete your todos.
        </p>

        <div className="flex justify-center mb-8">
          <Link
            href="/todos/add"
            className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
          >
            ➕ Add New Todo
          </Link>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available.</p>
        ) : (
          todos.map((todo, index) => (
            <div
              key={index}
              className="w-[200px] h-[100px] bg-gray-50 p-6 mb-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                title : {todo.title}
              </h2>
              <p className="text-gray-600 mb-2">
                description : {todo.description}
              </p>
              <p
                className={`mb-3 font-medium ${
                  todo.completed ? "text-green-600" : "text-red-500"
                }`}
              >
                {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href={`/todos/edit/${todo.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  <PencilOff />
                </Link>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:underline font-medium"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
