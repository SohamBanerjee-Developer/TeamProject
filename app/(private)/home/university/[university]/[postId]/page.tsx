import React from 'react'

const Page = async ({params}: { params: Promise<{postId: string }>}) => {
    const {postId} = await params;


    return (
        <div>postID: {postId }</div>
    )
}
export default Page
