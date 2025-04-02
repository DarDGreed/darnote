import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditForm = () => {
  const searchParams = useSearchParams();
  const fullParam = searchParams.get("show")
  const id = fullParam?.split("/")[1]
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  console.log(id)

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    try{
      const response = await axios.get(`/api/${id}`)
      const item = response.data.getItem[0]
      setName(item.name)
      setContent(item.content)
      console.log(item)
    }catch(error: any){
      console.error("error fetching items", error.message)
    }
  }
  const updateItem = async (updatedData: any) => {
    try{
      const response = await axios.patch(`/api/${id}`,updatedData)
      return response.data
    }catch(error: any){
      console.error("error updating data", error.message)
    }
  }
  const handleSubmit = async (e: any) => {
      const updatedItem = await updateItem({name, content})
      if(updatedItem){
        alert("update successful")
      }
  }
  return (
    <>
      <form className="relative w-full h-[500px] rounded flex flex-col justify-between py-10 bg-green-200 m-4 p-4 z-10 text-2xl">
        <div>
          <div className="w-full flex flex-col">
            <label htmlFor="">Name:</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-green-300 rounded p-4" />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="">Content:</label>
            <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} required className="bg-green-300 rounded p-4 h-[200px]" />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-300 p-4 rounded font-semibold cursor-pointer" onClick={handleSubmit}>Update Item</button>
      </form>
    </>
  );
};

export default EditForm