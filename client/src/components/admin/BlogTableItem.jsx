import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished, _id } = blog;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const statusText = isPublished ? "Published" : "Unpublished";

  const deleteBlog = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!shouldDelete) return;

    try {
      const { data } = await axios.delete(`/api/blog/delete/${_id}`);
      data.success ? toast.success(data.message) : toast.error(data.message);
      await fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.patch(`/api/blog/toggle-publish/${_id}`);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      await fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th scope="row" className="px-2 py-4">
        {index}
      </th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <span
          className={`font-medium ${
            isPublished ? "text-green-800" : "text-orange-700"
          }`}
        >
          {statusText}
        </span>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={togglePublish}
            className="border px-2 py-1 rounded cursor-pointer"
            aria-label="Toggle publish status"
          >
            {statusText}
          </button>
          <img
            onClick={deleteBlog}
            src={assets.cross_icon}
            alt="Delete blog"
            className="w-6 h-6 hover:opacity-80 cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
