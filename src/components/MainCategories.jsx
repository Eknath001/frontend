import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("cat");

  const categories = [
    { name: "All Posts", value: "All Posts", path: "/posts" },
    { name: "Programming", value: "programming", path: "/posts?cat=programming" },
    { name: "Jobs", value: "jobs", path: "/posts?cat=jobs" },
    { name: "News", value: "news", path: "/posts?cat=news" },
    { name: "Search Engines", value: "seo", path: "/posts?cat=seo" },
    { name: "Marketing", value: "marketing", path: "/posts?cat=marketing" },
  ];

  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* Category Links */}
      <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
        {categories.map(({ name, path, value }) => (
          <Link
            key={name}
            to={path}
            className={`rounded-full px-4 py-2 transition ${
              (value === currentCategory || (!value && !currentCategory))
                ? "bg-blue-800 text-white"
                : "hover:bg-blue-50 text-gray-800"
            }`}
          >
            {name}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <span className="text-xl font-medium hidden xl:block">|</span>

      {/* Search */}
      <Search />
    </div>
  );
};

export default MainCategories;
