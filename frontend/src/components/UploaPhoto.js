import React, { useState } from "react";

const PhotoUpload = () => {
  const [imageSrc, setImageSrc] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Upload a Photo</h1>
      <div className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 border border-dashed border-gray-400 flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="object-cover h-full w-full" />
        ) : (
          <span className="text-gray-500">No image uploaded</span>
        )}
      </div>
      <label className="block mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <span className="px-4 py-2 cursor-pointer text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
          Choose Photo
        </span>
      </label>
      {imageSrc && (
        <button
          onClick={() => setImageSrc("")}
          className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
          Remove Photo
        </button>
      )}
    </div>
  );
};

export default PhotoUpload;
