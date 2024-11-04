import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";

import { BlogItem, Button, Gap } from "../../components";
import { updatedDataBlog } from "../../config";
import { IHomeState } from "../../types/homeTypes";
import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();

  const { dataBlogs } = useSelector((state: IHomeState) => state.home);

  useEffect(() => {
    const blogUrl = `${import.meta.env.VITE_URL_API}/blog?perPage=4`;
    axios
      .get(blogUrl)
      .then((res) => {
        const response = res.data;
        dispatch(updatedDataBlog(response.data));
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, [dispatch]);

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
        {dataBlogs.map((blog, index) => (
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
