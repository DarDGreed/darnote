import connectDB from "./db/connectDB";
import Items from "./models/grocery.items";

export async function GET(_request: Request){
  await connectDB();
  try{
    const items = await Items.find({}).sort({createdAt: -1})

    return Response.json({items})
  }catch(error: any){
    console.log("Error fetching Items")
    return Response.json({message: error.message})
  }
}

export async function POST(request: Request){
  const item = await request.json();
  const name = item.name
  const content = item.content
  try{
    await Items.create({
      name,
      content
    })
    return Response.json({
      success: "Item added successfully"
    })
  }catch(error){
    return Response.json({
      error: "Error Adding Item"
    })
  }
}