import React from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import BlogList from "../components/BlogList.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
// import BlogCard from "../components/BlogCard.jsx";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogList />
      {/* <BlogCard /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
