const SkeletonLoader = ({ title }) => (
  <div className="animate-pulse space-y-4 p-4 border rounded">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>
);
export default SkeletonLoader;
