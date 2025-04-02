"use client"
import AddForm from "@/components/AddForm"
import EditForm from "@/components/EditForm"
import ItemsList from "@/components/ItemsList"
import { Plus } from "lucide-react"
import { useRouter, useSearchParams} from "next/navigation"
import { useState } from "react"

export default function Home(){
  const [isAddItemOpen, setAddItemOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams();
  const show = searchParams.get("show")

  return(
    <div className="size-full flex items-center justify-center">
      {isAddItemOpen && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 w-full z-10">
          <button onClick={() => setAddItemOpen(false)} className="absolute top-40 right-6 z-20 p-2 cursor-pointer bg-green-300 rounded">
            Close
          </button>
          <AddForm />
        </div>
      )}
      {show && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 w-full z-10">
          <button onClick={() => router.push("/")} className="absolute top-40 right-6 z-20 p-2 cursor-pointer bg-green-300 rounded">
            Close
          </button>
          <EditForm />
        </div>
      )}
        
      <div className="size-full overflow-y-scroll no-scrollbar">
        <ItemsList />
      </div>
      <button onClick={() => setAddItemOpen(!isAddItemOpen)} className="absolute right-4 bottom-4 bg-green-400 rounded-full p-4 cursor-pointer">
        <Plus color="black"/>
      </button>
    </div>
  )
}