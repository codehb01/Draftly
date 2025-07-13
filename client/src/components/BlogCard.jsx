import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className="">
      <img src={image} alt="" className="aspect-video" />
      <span>{category}</span>
      <div className="p-5 ">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p className="mb-3 text-xs text-gray-600">{description.slice(0, 80)}</p>
      </div>
    </div>
  );
};

export default BlogCard;
