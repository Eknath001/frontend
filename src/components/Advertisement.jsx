import React from "react";

const Advertisement = ({ ads }) => {
  return (
    <div className="p-6 border rounded bg-yellow-100 shadow">
      <h2 className="text-xl font-bold mb-4">Advertisement</h2>
      {ads && ads.map((ad, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
          <p className="mb-2">{ad.content}</p>

          {ad.video ? (
            <video
              controls
              className="w-full max-h-96 rounded"
              src={ad.video}
            >
              Your browser does not support the video tag.
            </video>
          ) : ad.image ? (
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full max-h-96 rounded object-cover"
            />
          ) : (
            <p className="text-sm text-gray-500">No media available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
