"use server";

export async function addTodo(formData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editTodo(todo) {
  const { title, description, completed, id } = todo;
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      completed,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
