import React from "react";

const ProgrammingLanguages = ({ languages }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Top Programming Languages</h2>
      <ul className="space-y-2">
        {languages.map((lang, index) => (
          <li key={index} className="flex justify-between items-center border p-3 rounded">
            <span>{lang.name}</span>
            <span className="text-sm text-gray-600">Popularity: {lang.popularity}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgrammingLanguages;
