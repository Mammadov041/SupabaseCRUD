import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Homepage</h1>
      <a
        href="/todos/home"
        className="px-6 py-3  text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition-all duration-300 text-lg"
      >
        Go to Todos
      </a>
    </div>
  );
}
