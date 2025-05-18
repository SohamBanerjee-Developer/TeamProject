"use server"

export const handleAdminLogin = async (data: FormData): Promise<void> => {
 await new Promise((resolve) => {
       setTimeout(() => {resolve(true)}, 12000)
   });
    console.log(data)


}