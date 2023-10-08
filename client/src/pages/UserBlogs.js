import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  console.log(blogs);

  const noBlogStyle = {
    display: "flex",
    height: "80vh",
    alignItems: "center",
    justifyContent: "center",
  };

  const innerBoxStyle = {
    backgroundColor: "#007BFF",
    padding: "40px 60px",
    borderRadius: "15px",
    color: "white",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
  };

  return (
    <div style={blogs && blogs.length > 0 ? {} : noBlogStyle}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div style={innerBoxStyle}>
          <h1>You Haven't Created a blog yet!</h1>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
