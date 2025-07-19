import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";
const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/delete/:id", auth, deleteBlogById);
blogRouter.patch("/toggle-publish/:id", auth, togglePublish);

// post a new comment and get comment list for ind blog
blogRouter.post("/add-comment", addComment);
blogRouter.get("/:blogId/comments", getBlogComments);

// gemini route
blogRouter.post("/generate", auth, generateContent);
export default blogRouter;
