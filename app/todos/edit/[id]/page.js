"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editTodo } from "@/app/todoActions";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditTodo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
    id: "",
  });

  const { id } = useParams();
  const getTodo = async () => {
    const todo = await fetch(`http://localhost:3000/api/todos/${id}`);
    setTodo(await todo.json());
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="flex flex-col w-[400px]  border border-zinc-300 p-5 rounded-md">
        <h1 className="text-2xl font-medium">Add Todo</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            placeholder="Title"
            required
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            value={todo?.title}
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="title">Description</Label>
          </div>
          <Input
            type="text"
            name="description"
            placeholder="Your description"
            required
            className="mb-3"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            value={todo?.description}
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="completed">Completed</Label>
            <Input
              type="checkbox"
              name="completed"
              checked={todo?.completed}
              onChange={(e) =>
                setTodo({ ...todo, completed: e.target.checked })
              }
              value={todo?.completed}
              className="w-4 h-4 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <SubmitButton
            pendingText="Editing todo ..."
            formAction={() => editTodo(todo)}
          >
            Save
          </SubmitButton>
        </div>
        <Link href="/todos/home">Go Back</Link>
      </form>
    </div>
  );
}
