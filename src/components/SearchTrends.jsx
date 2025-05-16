import React from "react";

const SearchTrends = ({ trends }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Search Engine Trends</h2>
      <ul className="space-y-2">
        {trends.map((trend, index) => (
          <li key={index} className="flex justify-between items-center border p-3 rounded">
            <span>{trend.keyword}</span>
            <span className="text-sm text-gray-600">Search Volume: {trend.volume}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTrends;
