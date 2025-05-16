import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostListItem from "./PostListItem";

const PostList = () => {
  const [searchParams] = useSearchParams();

  const fetchPosts = async ({ pageParam = 1 }) => {
    const queryParams = Object.fromEntries([...searchParams]);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: { page: pageParam, limit: 10, ...queryParams },
      });
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : undefined),
  });

  if (error) return <p className="text-red-500">Something went wrong!</p>;

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div>
      {isFetching && !isFetchingNextPage && <p>Loading...</p>}

      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={<p><b></b></p>}
      >
        {allPosts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;
