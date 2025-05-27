import React from "react";

interface postCardProps {
  userName: string;
  body?: string;
  documentUrl?: string;
  documentType?: "image" | "video" | "poll";
  timeAgo: string;
  upvoteCount?: number;
  commentLength?: number;
}

export default function postCard({
  userName,
  body,
  documentUrl,
  documentType,
  timeAgo,
  upvoteCount,
  commentLength,
}: postCardProps) {
  return (
    <>
      <div className="post-card rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500  flex items-center justify-center">
            <i className="fas fa-user text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 text-lg">{userName}</h4>
            <p className="text-gray-500 text-sm">{timeAgo}</p>
          </div>
        </div>
        
        {body ? (
          <p className="text-gray-700 text-xs mb-4 leading-relaxed ">{body}</p>
        ) : (
          ""
        )}
        
        {documentUrl ? (
          <div className="mb-4 rounded-xl overflow-hidden">
            
            {documentType === "image" ? (
              <img
                src="${post.media.url}"
                alt="Post media"
                className="w-full h-2/5 object-cover"
              />
            ) : (
              <video
                src="${post.media.url}"
                controls
                className="w-full h-64 object-cover"
              ></video>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            className="like-button flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-50 ${post.liked ? 'liked' : 'text-gray-600'}"
            data-post-id="${post.id}"
          >
            <i className="fas fa-heart text-lg"></i>
            <span className="font-medium text-sm">{upvoteCount}</span>
          </button>

          <button
            className="comment-button flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-600"
            data-post-id="${post.id}"
          >
            <i className="fas fa-comment text-lg"></i>
            <span className="font-medium text-sm">{commentLength}</span>
          </button>
        </div>
      </div>
    </>
  );
}
