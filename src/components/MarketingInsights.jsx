import React from "react";
import searchTrendsData from "../data/searchTrends.json";
const MarketingInsights = ({ insights }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Marketing Insights</h2>
      {insights.map((item, index) => (
        <div key={index} className="p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MarketingInsights;
