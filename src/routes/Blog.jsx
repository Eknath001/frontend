import React, { useState, useEffect, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import blogData from "../data/blogData.json";
import SkeletonLoader from "../components/SkeletonLoader"; // Your custom loader
import { Card, CardContent } from "@/components/ui/card";

const MarketingInsights = React.lazy(() =>
  import("../components/MarketingInsights")
);
const ProgrammingLanguages = React.lazy(() =>
  import("../components/ProgrammingLanguages")
);
const SearchTrends = React.lazy(() => import("../components/SearchTrends"));
const Advertisement = React.lazy(() => import("../components/Advertisement"));

const Blog = () => {
  const {
    newsArticles,
    marketingInsights,
    programmingLanguages,
    searchTrends,
  } = blogData;

  // Search, Filter, Pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Intersection Observer for each lazy section
  const [marketingRef, marketingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [languagesRef, languagesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [trendsRef, trendsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [adsRef, adsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Filtering and pagination logic
  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-4">Blog & Insights</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-4 py-2 w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-4 py-2"
        >
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="design">Design</option>
        </select>
      </div>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNews.map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.date}</p>
                <p>{article.summary}</p>
                <p className="text-xs text-gray-400">
                  Category: {article.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* Lazy Load Sections with Skeleton Fallbacks */}
      <section ref={marketingRef}>
        {marketingInView && (
          <Suspense fallback={<SkeletonLoader title="Marketing Insights" />}>
            <MarketingInsights insights={marketingInsights} />
          </Suspense>
        )}
      </section>

      <section ref={languagesRef}>
        {languagesInView && (
          <Suspense fallback={<SkeletonLoader title="Programming Languages" />}>
            <ProgrammingLanguages languages={programmingLanguages} />
          </Suspense>
        )}
      </section>

      <section ref={trendsRef}>
        {trendsInView && (
          <Suspense fallback={<SkeletonLoader title="Search Trends" />}>
            <SearchTrends trends={searchTrends} />
          </Suspense>
        )}
      </section>
      <section ref={adsRef}>
        {adsInView && (
          <Suspense fallback={<SkeletonLoader title="Advertisement" />}>
            <Advertisement ads={blogData.advertisements} />
          </Suspense>
        )}
      </section>
    </div>
  );
};

export default Blog;