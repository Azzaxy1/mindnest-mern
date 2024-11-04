import { Link } from "react-router-dom";
import { BlogItem, Button, Gap } from "../../components";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";

import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const blogUrl = `${import.meta.env.VITE_URL_API}/blog?perPage=4`;
    axios
      .get(blogUrl)
      .then((res) => {
        const response = res.data;

        setBlogs(response.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  return (
    <div className="home-page-wrapper">
      <div className="create-wrapper">
        <Link className="link" to="/create-blog">
          <Button title="Create Blog" iconPosition="top">
            <FaPlus />
          </Button>
        </Link>
      </div>
      <Gap height={20} />
      <div className="content-wrapper">
        {blogs.map((blog, index) => (
          <BlogItem key={index} blog={blog} />
        ))}
      </div>
      <div className="pagination">
        <Button title="Previous" iconPosition="top">
          <GrPrevious />
        </Button>
        <Gap width={20} />
        <Button title="Next" iconPosition="bottom">
          <GrNext />
        </Button>
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Home;
