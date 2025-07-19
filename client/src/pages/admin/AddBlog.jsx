import React, { useState, useRef, useEffect } from "react";
import { assets, blogCategories } from "../../assets/assets.js";
import Quill from "quill";
import Theme from "quill/core/theme.js";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { parse } from "marked";
const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // user input logic
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Intiate Quill once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title,
        subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if (!title) return toast.error("Please enter blog title");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
      onSubmit={onSubmitHandler}
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="upload-icon"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4 ">Blog Title</p>
        <input
          type="text"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter blog title"
        />
        <p className="mt-4">Blog Subtitle</p>
        <input
          type="text"
          required
          onChange={(e) => setSubTitle(e.target.value)}
          value={subtitle}
          placeholder="Enter blog subtitle"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>

          {/* while generating this genrating state remains true */}
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
            onClick={generateContent}
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
