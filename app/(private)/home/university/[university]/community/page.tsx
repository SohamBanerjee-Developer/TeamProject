import React from 'react'
import "./community.css"
import CreatePost from '@/app/_components/community/createPost'
import PostFeed from '@/app/_components/community/postFeed'

export default function page() {
  return (
    <div className='container mx-auto px-12 py-12 max-w-7xl'>
      <CreatePost/>
      <PostFeed/>
      </div>
  )
}
