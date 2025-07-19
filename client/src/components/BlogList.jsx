import { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/appContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // Step 1: filter by search input
  const searchedBlogs = blogs.filter((blog) => {
    const title = blog.title?.toLowerCase() || "";
    const category = blog.category?.toLowerCase() || "";
    const search = input.toLowerCase();
    return title.includes(search) || category.includes(search);
  });

  // Step 2: filter by category
  const visibleBlogs = searchedBlogs.filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              className={`cursor-pointer text-gray-500 font-medium transition px-2 py-1 rounded-full ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
              aria-pressed={menu === item}
              onClick={() => setMenu(item)}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {visibleBlogs.length > 0 ? (
          visibleBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
