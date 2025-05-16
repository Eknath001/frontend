import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostMenuActions = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Saved Posts
  const {
    data: savedPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!user, // Fetch only if user is logged in
  });

  const isAdmin = user?.publicMetadata?.role === "admin";
  const isSaved = savedPosts?.includes(post._id);

  // Delete Post
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to delete post");
    },
  });

  // Save/Unsave Post
  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["savedPosts"]);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to save post");
    },
  });

  // Feature Post
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", post.slug]);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to feature post");
    },
  });

  // Action Handlers
  const handleDelete = () => deleteMutation.mutate();
  const handleFeature = () => featureMutation.mutate();
  const handleSave = () => (user ? saveMutation.mutate() : navigate("/login"));

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to fetch saved posts!</p>
      ) : (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSave}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
              fill={saveMutation.isPending ? (isSaved ? "none" : "black") : isSaved ? "black" : "none"}
            />
          </svg>
          <span>Save this Post</span>
          {saveMutation.isPending && <span className="text-xs">(in progress)</span>}
        </div>
      )}

      {isAdmin && (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleFeature}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={featureMutation.isPending ? (post.isFeatured ? "none" : "black") : post.isFeatured ? "black" : "none"}
            />
          </svg>
          <span>Feature</span>
          {featureMutation.isPending && <span className="text-xs">(in progress)</span>}
        </div>
      )}

      {user && (post.user.username === user.username || isAdmin) && (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="red" width="20px" height="20px">
            <path d="M 21 2 C 19.3 2 18 3.3 18 5 V 7 H 10 L 8 7 A 1 1 0 0 0 8 9 H 9 V 45 C 9 46.7 10.3 48 12 48 H 38 C 39.7 48 41 46.7 41 45 V 9 H 42 A 1 1 0 1 0 42 7 H 40 L 32 7 V 5 C 32 3.3 30.7 2 29 2 H 21 Z M 21 4 H 29 C 29.6 4 30 4.4 30 5 V 7 H 20 V 5 C 20 4.4 20.4 4 21 4 Z M 11 9 H 39 V 45 C 39 45.6 38.6 46 38 46 H 12 C 11.4 46 11 45.6 11 45 V 9 Z M 18 15 V 40 A 1 1 0 1 0 20 40 V 15 A 1 1 0 1 0 18 15 Z M 24 15 V 40 A 1 1 0 1 0 26 40 V 15 A 1 1 0 1 0 24 15 Z M 30 15 V 40 A 1 1 0 1 0 32 40 V 15 A 1 1 0 1 0 30 15 Z" />
          </svg>
          <span>Delete this Post</span>
          {deleteMutation.isPending && <span className="text-xs">(in progress)</span>}
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;
