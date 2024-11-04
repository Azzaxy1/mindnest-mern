import { useDispatch, useSelector } from "react-redux";
import { updatedDataBlog, updatedName } from "../../config/redux/store";
import { IBLog } from "../../types/blog";
import { useEffect } from "react";
import axios from "axios";
import { BlogItem, Button, Gap } from "../../components";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import "./home.scss";

interface BlogState {
  dataBlogs: IBLog[];
  name: string;
}

const Home = () => {
  const dispatch = useDispatch();

  const name = useSelector((state: BlogState) => state.name);
  const dataBlogs = useSelector((state: BlogState) => state.dataBlogs);
  console.log("dataBlogs:", dataBlogs);
  console.log("name", name);

  useEffect(() => {
    setTimeout(() => {
      dispatch(updatedName("Azis"));
    }, 3000);

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
      <p>{name}</p>
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
