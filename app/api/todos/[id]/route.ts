import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return new Response(JSON.stringify({ error: "Todo was not found " }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const body = await req.json();
  const { title, description, completed } = body;
  const { id } = params;
  if (!id || !title || !description || !completed) {
    return new Response(
      JSON.stringify({
        error: "ID, title , description and completed are required",
      }),
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from("todos")
    .update({ title, description, completed })
    .eq("id", Number(id))
    .single();
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .single();
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
