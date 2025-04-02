import connectDB from "../db/connectDB";
import Items from "../models/grocery.items";

interface Params {
  params: { itemId: string };
}

export async function GET(_request: Request, { params }: Params) {
  await connectDB();
  try {
    const { itemId } = params;
    const getItem = await Items.find({ _id: itemId });

    return new Response(JSON.stringify({ getItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error fetching Item", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ message: "Unknown error" }), { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  await connectDB();
  try {
    const { itemId } = params;
    const body = await request.json();

    const { name, content } = body;
    const updatedItem = await Items.findByIdAndUpdate(
      itemId,
      { name, content },
      { new: true, runValidators: true }
    );

    return new Response(JSON.stringify(updatedItem), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error updating Item", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ message: "Unknown error" }), { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  await connectDB();
  try {
    const { itemId } = params;
    const deleteItem = await Items.findByIdAndDelete(itemId);

    return new Response(JSON.stringify({ message: "Item deleted", deleteItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: "Error deleting Item", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ message: "Unknown error" }), { status: 500 });
  }
}
