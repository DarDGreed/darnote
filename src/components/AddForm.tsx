"use client"
import axios from "axios";
import { useState } from "react";

const AddForm = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  interface Item {
    name: string;
    content: string;
  }

  const createItem = async (newItem: Item): Promise<Item | null> => {
    try {
      const response = await axios.post("/api", newItem);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding item:", error.message);
      }
      return null;
    }
  };

  const handleSubmit = async () => {
    const newItem = await createItem({ name, content });

    if (newItem) {
      alert("Item created");
      setName("");
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full h-[500px] rounded flex flex-col justify-between py-10 bg-green-200 m-4 p-4 z-10 text-2xl"
    >
      <div>
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="text-black">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-green-300 rounded p-4"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="content" className="text-black">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="bg-green-300 rounded p-4 h-[200px]"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-300 p-4 rounded font-semibold cursor-pointer"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddForm;
