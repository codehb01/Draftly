import React from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import BlogList from "../components/BlogList.jsx";
// import BlogCard from "../components/BlogCard.jsx";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogList />
      {/* <BlogCard /> */}
    </div>
  );
};

export default Home;
