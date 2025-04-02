import connectDB from "./db/connectDB";
import Items from "./models/grocery.items";

export async function GET() {
  await connectDB();
  try {
    const items = await Items.find({}).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching Items:", error.message);
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: "Unknown error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const item = await request.json();
    const { name, content } = item;

    if (!name || !content) {
      return new Response(JSON.stringify({ error: "Name and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Items.create({ name, content });

    return new Response(JSON.stringify({ success: "Item added successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding item:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
