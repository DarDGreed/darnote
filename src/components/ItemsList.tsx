"use client";
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Item {
  _id: string;
  name: string;
  content: string;
}

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api");
        setItems(response.data.items);
      } catch (error) {
        console.error("Error fetching items", (error as Error).message);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId: string) => {
    console.log("Deleting:", itemId);
    try {
      await axios.delete(`/api/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item", (error as Error).message);
    }
  };

  const handleUpdate = (itemId: string) => {
    console.log("Updating:", itemId);
    router.push(`/?show=true/${itemId}`);
  };

  return (
    <>
      {items.map((item) => (
        <div key={item._id}>
          <div className="bg-green-300 m-4 rounded p-4 flex justify-between items-center">
            <div>
              <div className="flex gap-2">
                <label className="text-black">Title: </label>
                <p>{item.name}</p>
              </div>
              <p>{item.content}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleUpdate(item._id)} className="cursor-pointer">
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
  );
}
