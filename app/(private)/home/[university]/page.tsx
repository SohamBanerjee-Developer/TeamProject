import React from 'react'

const Page = async({params}: { params: Promise<{university: string }>}) => {
    const {university} = await params;
    console.log(university)
    return (
        <div>
            { university}
        </div>
    )
}
export default Page
