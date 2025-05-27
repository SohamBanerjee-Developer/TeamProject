import { postModel } from '@/app/_lib/models/Community'
import React from 'react'
import PostCard from './postCard'

async function getPosts(){
  const reponse = await postModel.find().populate("hashtags", "hashtag")
  console.log(reponse);
  
  return reponse
}


export default async function postFeed() {
  const posts = await getPosts()
  return (
    <div id="postsFeed" className="space-y-6">
        {posts.map(post=><PostCard body={post.body} documentType={post.documentType} documentUrl={post.documentUrl} timeAgo='5m' commentLength={5} userName='soham' />)}
    </div>
  )
}
