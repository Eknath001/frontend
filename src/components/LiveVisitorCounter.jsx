import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL); // Use env var

const LiveVisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("visitorCount", (data) => {
      setCount(data);
      setLastUpdated(new Date().toLocaleTimeString());
    });

    // Fetch on mount
    socket.emit("getVisitorCount");

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      socket.emit("getVisitorCount");
    }, 10000);

    return () => {
      socket.off("visitorCount");
      socket.off("connect");
      socket.off("disconnect");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 text-sm text-gray-700 p-2 rounded-md bg-gray-100 shadow-sm hover:shadow-md transition duration-300 ease-in-out w-fit">
      <span className={isConnected ? "text-green-500" : "text-green-500"}>●</span>
      <span className="font-medium">Live Visitors:</span>
      <span
        key={count}
        className="text-blue-600 font-semibold transition-all duration-500"
      >
        {count}
      </span>
      {/* Refresh button hidden */}
      {lastUpdated && (
        <span
          className="ml-1 text-gray-400 text-xs tooltip"
          title={`Last updated at ${lastUpdated}`}
        >
          ⏱
        </span>
      )}
    </div>
  );
};

export default LiveVisitorCounter;
