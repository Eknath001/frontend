import { useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (key, value) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (currentParams[key] !== value) {
      setSearchParams({ ...currentParams, [key]: value });
    }
  };

  const handleFilterChange = (e) => updateParams("sort", e.target.value);
  const handleCategoryChange = (category) => updateParams("cat", category);

  const categories = [
    { label: "All", value: "general" },
    { label: "Programming", value: "programming" },
    { label: "Jobs", value: "jobs" },
    { label: "News", value: "news" },
    { label: "Search Engines", value: "seo" },
    { label: "Marketing", value: "marketing" },
  ];

  const currentSort = searchParams.get("sort");
  const currentCategory = searchParams.get("cat");

  return (
    <div className="px-4 h-max sticky top-8">
      <h2 className="mb-4 text-sm font-medium">Search</h2>
      <Search />

      <h2 className="mt-8 mb-4 text-sm font-medium">Filter</h2>
      <div className="flex flex-col gap-2 text-sm">
        {["newest", "popular", "trending", "oldest"].map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              onChange={handleFilterChange}
              value={option}
              checked={currentSort === option}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 rounded-sm bg-white checked:bg-blue-800 cursor-pointer"
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>

      <h2 className="mt-8 mb-4 text-sm font-medium">Categories</h2>
      <div className="flex flex-col gap-2 text-sm">
        {categories.map(({ label, value }) => (
          <span
            key={value}
            className={`underline cursor-pointer ${
              currentCategory === value ? "text-blue-800 font-semibold" : ""
            }`}
            onClick={() => handleCategoryChange(value)}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
