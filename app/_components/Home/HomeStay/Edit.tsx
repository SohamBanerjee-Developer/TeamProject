"use client"

import {useAuthClient} from "@/app/_hooks/helper";

const Edit = ({id}: { id: string}) => {
      const {user} = useAuthClient();
    console.log(user)
    console.log(id)

    return (
        <div className={`absolute top-0 right-5 flex-center h-10 w-10 bg-gray-600 rounded-full group ${user !== id? "hidden": ""}`}>
            <button className="cursor-pointer text-sm group-hover:text-lg">✏️</button>
        </div>

    )
}
export default Edit
