import React from 'react'

export default function createPost() {
  return (
  <div className="post-card rounded-2xl shadow-xl px-4 py-6 mb-10 ">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <i className="fas fa-user text-white text-lg"></i>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 text-xl">Create a new post</h3>
                    <p className="text-gray-500 text-sm">Share what's on your mind</p>
                </div>
            </div>

            <div className="space-y-4">
                <textarea 
                    id="postCaption" 
                    placeholder="What's happening?" 
                    className="w-full p-4 border-2 text-black border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-base resize-none"
                    rows= "3" 
                ></textarea>

                <div className="flex items-center justify-between">
                    <label htmlFor="mediaUpload" className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl cursor-pointer">
                        <i className="fas fa-camera text-lg"></i>
                        <span className="font-medium text-sm">Add Photo/Video</span>
                    </label>
                    <input 
                        type="file" 
                        id="mediaUpload" 
                        accept="image/,video/" 
                        className="hidden"
                    />
                    
                    <button 
                        id="createPostBtn" 
                        className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        <i className="fas fa-paper-plane mr-2"></i>
                        Post
                    </button>
                </div>

                {/* <!-- Media Preview --> */}
                <div id="mediaPreview" className="hidden">
                    <div className="preview-container rounded-xl p-4 border-2 border-dashed border-gray-300">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600 font-medium text-sm">Media Preview</span>
                            <button id="removeMedia" className="text-red-500 hover:text-red-700">
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        <div id="mediaContainer" className="rounded-xl overflow-hidden bg-white shadow-inner"></div>
                    </div>
                </div>
            </div>
        </div>

  )
}
