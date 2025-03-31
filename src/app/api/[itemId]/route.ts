import connectDB from "../db/connectDB";
import Items from "../models/grocery.items";

export async function GET(_request: Request, {params}: {params: Promise<{itemId: string}>}){
  await connectDB();
  try{
    const { itemId } = await params;
    const getItem = await Items.find({ _id : itemId })

    return Response.json({ getItem })
  }catch(error: any){
    return Response.json("Error fetching Item", error.message)
  }
}

export async function PATCH(request: Request, {params}: {params: Promise<{itemId: string}>}){
  await connectDB();
  try{
    const {itemId} = await params;
    const body = await request.json();

    const {name, content} = body;

    const updatedItem = await Items.findByIdAndUpdate(itemId, {name, content}, {new: true , runValidators: true})
    return Response.json(updatedItem)
  }catch(error: any){
    return Response.json("Error updating Item", error.message)
  }
}

export async function DELETE(_request: Request,{params}: {params: Promise<{itemId: string}>}){
  await connectDB();
  try{
    const {itemId} = await params;
    const deleteItem = await Items.findByIdAndDelete(itemId)
    return Response.json("Item deleted", deleteItem)
  }catch(error: any){
    return Response.json("Error deleting item", error.message)
  }
}