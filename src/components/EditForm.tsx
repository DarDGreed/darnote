import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditForm = () => {
  const searchParams = useSearchParams();
  const fullParam = searchParams.get("show");
  const id = fullParam?.split("/")[1];

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  console.log(id);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`/api/${id}`);
        const item = response.data.getItem[0];

        if (item) {
          setName(item.name);
          setContent(item.content);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching items:", error.message);
        }
      }
    };

    fetchItem();
  }, [id]);

  const updateItem = async (updatedData: { name: string; content: string }) => {
    try {
      const response = await axios.patch(`/api/${id}`, updatedData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating data:", error.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!id) return;

    const updatedItem = await updateItem({ name, content });
    if (updatedItem) {
      alert("Update successful");
    }
  };

  return (
    <form
      className="relative w-full h-[500px] rounded flex flex-col justify-between py-10 bg-green-200 m-4 p-4 z-10 text-2xl"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="text-black">
            Name:
          </label>
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
          <label htmlFor="content" className="text-black">
            Content:
          </label>
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
      <button type="submit" className="w-full bg-green-300 p-4 rounded font-semibold cursor-pointer">
        Update Item
      </button>
    </form>
  );
};

export default EditForm;
