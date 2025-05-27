import React from "react";

export default function commentList() {
  return (
    <div
      id="commentsModal"
      class="fixed inset-0 modal-overlay z-50 hidden flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-2xl shadow-2xl  max-w-[60rem] w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
          <button
            id="closeCommentsModal"
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div
          id="commentsList"
          className="p-6 max-h-64 overflow-y-auto space-y-4 text-2xl"
        >
            {/* comments will be added here */}
        </div>
      </div>
    </div>
  );
}
