import React from "react";

interface mediaPreviewerProps {
    documentUrl?: string
    documentType?: "image"|"video"|"poll"
}

export default function mediaPreviewer({documentUrl, documentType}:mediaPreviewerProps) {
  return (
    <>
      <div id="mediaPreview">
        <div className="preview-container rounded-xl p-4 border-2 border-dashed border-gray-300">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium text-sm">
              Media Preview
            </span>
            <button
              id="removeMedia"
              className="text-red-500 hover:text-red-700"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
          <div
            id="mediaContainer"
            className="rounded-xl overflow-hidden bg-white shadow-inner"
          >
            {documentType === "image"? <img className="w-full h-96 object-cover rounded-2xl" alt={documentUrl} src={documentUrl}/>: <video className="w-full h-96 object-cover rounded-2xl" src={documentUrl}></video>}
          </div>
        </div>
      </div>
    </>
  );
}
