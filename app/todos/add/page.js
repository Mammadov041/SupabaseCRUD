import { addTodo } from "@/app/todoActions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AddTodo() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="flex flex-col w-[400px]  border border-zinc-300 p-5 rounded-md">
        <h1 className="text-2xl font-medium">Add Todo</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="title">Title</Label>
          <Input name="title" placeholder="Title" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="title">Description</Label>
          </div>
          <Input
            type="text"
            name="description"
            placeholder="Your description"
            required
          />
          <SubmitButton pendingText="Adding todo ..." formAction={addTodo}>
            Add Todo
          </SubmitButton>
        </div>
        <Link href="/todos/home">Go back</Link>
      </form>
    </div>
  );
}
