"use client"

import {useAuthClient} from "@/app/_hooks/helper";

const Edit = ({id}: { id: string}) => {
    const {user} = useAuthClient();
    console.log(user);
    console.log(id)

    return (
        <div>Edit</div>
    )
}
export default Edit
