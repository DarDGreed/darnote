"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const EditForm = () => {
  const { itemId } = useParams(); // Get item ID from URL
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  // Fetch item details when component loads
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/${itemId}`);
        const item = response.data.getItem[0];
        setName(item.name);
        setContent(item.content);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  // Function to update item
  const updateItem = async (updatedData: any) => {
    try {
      const response = await axios.patch(`/api/${itemId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedItem = await updateItem({ name, content });

    if (updatedItem) {
      alert("Item updated successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Item</button>
    </form>
    
  );
};

export default EditForm