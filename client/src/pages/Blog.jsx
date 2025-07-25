import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
const Blog = () => {
  const { id } = useParams();

  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}/comments`);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // new comment function
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
      ></img>
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary font-medium py-4">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          John Doe
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6  ">
        <img src={data.image} alt="" className="rounded-3xl mb-5 " />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        {/* comment section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-2">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p>{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment section */}
        <div className=" max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col gap-4 items-start max-w-lg"
          >
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <textarea
              placeholder="Commment"
              className="w-full pb-10 border border-gray-300 rounded outline-none pt-2 pl-2 h-48"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <button
              className="bg-primary text-white p-2 px-8 rounded hover:scale-102 transition-all cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share buttons  */}
        <div>
          <p className="font-semibold my-4">
            Share this article on social media{" "}
          </p>
          <div className="flex">
            <img src={assets.facebook_icon}></img>
            <img src={assets.googleplus_icon}></img>
            <img src={assets.twitter_icon}></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Blog;
