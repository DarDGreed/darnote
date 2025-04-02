"use client"
import AddForm from "@/components/AddForm"
import EditForm from "@/components/EditForm"
import ItemsList from "@/components/ItemsList"
import { Plus } from "lucide-react"
import { useRouter, useSearchParams} from "next/navigation"
import { Suspense, useState } from "react"

const HomeComponent = () => {
  const [isAddItemOpen, setAddItemOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams();
  const show = searchParams.get("show")
  
  const handleResponse = (response: boolean) => {
    console.log(response)
    setAddItemOpen(response)
  }

  return (
    <div className="size-full flex items-center justify-center">
      {isAddItemOpen && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 w-full z-10">
          <AddForm onResponse={handleResponse}/>
        </div>
      )}
      {show && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 w-full z-10">
          <EditForm />
        </div>
      )}

      <div className="size-full overflow-y-scroll no-scrollbar">
        <ItemsList />
      </div>
      <button onClick={() => setAddItemOpen(true)} className="absolute right-4 bottom-4 bg-green-400 rounded-full p-4 cursor-pointer">
        <Plus color="black" />
      </button>
    </div>
  )
}

export default function Home(){
  return(
    <Suspense fallback={"/"}>
      <HomeComponent />
    </Suspense>
  )
}