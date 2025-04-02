"use client"
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Item{
  _id: string;
  name: string;
  content: string;
}

export default function ItemsList(){
  const [items, setItems] = useState([])
  const router = useRouter();
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try{
    const response = await axios.get("/api")
    setItems(response.data.items)
    }catch(error: any){
      console.error("error fetching items", error.message)
    }
  }

  const handleDelete = (itemId: any) => {
    console.log(itemId)
    try {
      axios.delete(`/api/${itemId}`)
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId))
    } catch (error: any) {
      console.error("error deleting item", error.message)
    }
  }
  const handleUpdate = (itemId: any) => {
    console.log(itemId)
    router.push(`/?show=true/${itemId}`)
  }


  return(
    <>
      {items.map((item: Item, index) => (
        <div key={index}>
          <div className="bg-green-300 m-4 rounded p-4 flex justify-between items-center">
            <div>
              <div className="flex gap-2">
                <label htmlFor="" className="text-black">Title: </label>
                <p>{item.name}</p>
              </div>
              <p>{item.content}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => {handleUpdate(item._id)}} className="cursor-pointer">
                <FilePenLine color="black" />
              </button>
              <button onClick={() => handleDelete(item._id)} className="cursor-pointer">
                <Trash2 color="black" />
              </button>
            </div>
          </div>
          
        </div>
      ))}
    </>
  )
}