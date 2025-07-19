import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/blog/${_id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-[1.02] hover:shadow-primary/25 transition-transform duration-300 cursor-pointer focus:outline-primary"
    >
      <img
        src={image}
        alt={title || "Blog thumbnail"}
        className="aspect-video w-full object-cover"
      />

      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
        {category}
      </span>

      <div className="p-5">
        <h4 className="mb-2 font-medium text-gray-900 text-base">{title}</h4>

        <p
          className="mb-3 text-xs text-gray-600 line-clamp-3"
          // WARNING: Only use this if content is sanitized server-side
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
