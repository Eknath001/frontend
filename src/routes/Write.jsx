import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (isLoaded && !isSignedIn) return <div>You should login!</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover?.filePath || "",
      title: formData.get("title").trim(),
      category: formData.get("category"),
      desc: formData.get("desc").trim(),
      content: value.trim(),
    };

    const newErrors = {};
    if (!data.img) newErrors.img = "Cover image is required.";
    if (!data.title) newErrors.title = "Title is required.";
    if (!data.category) newErrors.category = "Category is required.";
    if (!data.desc) newErrors.desc = "Description is required.";
    if (!data.content) newErrors.content = "Content is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields.");
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/*<Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </button>
        </Upload>*/}

        <Upload type="image" setProgress={setProgress} setData={setCover}>
          {
            <button
              type="button"
              onClick={close}
              className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
            >
              Add a cover image
            </button>
          }
        </Upload>
        {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}

        <input
          className={`text-4xl font-semibold bg-transparent outline-none ${
            errors.title ? "border-b border-red-500" : ""
          }`}
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="">--Select--</option>
            <option value="general">General</option>
            <option value="programming">Programming</option>
            <option value="jobs">Jobs</option>
            <option value="news">News</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}

        <textarea
          className={`p-4 rounded-xl bg-white shadow-md ${
            errors.desc ? "border border-red-500" : ""
          }`}
          name="desc"
          placeholder="A Short Description"
        />
        {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}

        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>
          <div className="flex-1">
            <ReactQuill
              theme="snow"
              className="rounded-xl bg-white shadow-md h-full"
              value={value}
              onChange={setValue}
              readOnly={0 < progress && progress < 100}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
        </div>

        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>

        <div className="flex items-center gap-2 text-sm text-dark-600">
          <CircularProgressWithLabel value={progress} />
          {/*<span>Progress: {progress}%</span> */}
        </div>
      </form>
    </div>
  );
};

export default Write;
