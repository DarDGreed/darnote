"use client"
import AddForm from "@/components/AddForm"
import EditForm from "@/components/EditForm"
import ItemsList from "@/components/ItemsList"
import { Plus } from "lucide-react"
import { useRouter} from "next/navigation"
import { useState } from "react"

export default function Home({searchParams}){
  const [isAddItemOpen, setAddItemOpen] = useState(false)
  const [isUpdateItemOpen, setUpdateItemOpen] = useState(false)
  const router = useRouter()
  const show = searchParams?.show

  return(
    <div className="size-full flex items-center justify-center relative">
      {isAddItemOpen && (
        <div className="absolute inset-0 flex items-center bg-black/50 w-full z-10">
          <button onClick={() => setAddItemOpen(false)} className="absolute top-47 right-6 z-20 p-2 cursor-pointer bg-green-300 rounded">
            Close
          </button>
          <AddForm />
        </div>
      )}
      {show && (
        <div className="absolute inset-0 flex items-center bg-black/50 w-full z-10">
          <button onClick={() => router.push("/")} className="absolute top-47 right-6 z-20 p-2 cursor-pointer bg-green-300 rounded">
            Close
          </button>
          <EditForm />
        </div>
      )}
        
      <div className="relative w-full max-h-[835px] h-full overflow-y-scroll no-scrollbar">
        <ItemsList />
      </div>
      <button onClick={() => setAddItemOpen(!isAddItemOpen)} className="absolute right-4 bottom-4 bg-green-400 rounded-full p-4 cursor-pointer">
        <Plus color="black"/>
      </button>
    </div>
  )
}