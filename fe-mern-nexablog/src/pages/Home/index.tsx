import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";

import { BlogItem, Button, Gap } from "../../components";
import { fetchBlogs } from "../../services/blogService";
import { IHomeState } from "../../types/homeTypes";
import "./home.scss";
import { updatedPage } from "../../config";

const Home = () => {
  const dispatch = useDispatch();
  const perPage = 4;

  const { dataBlogs, page } = useSelector((state: IHomeState) => state.home);

  useEffect(() => {
    fetchBlogs(dispatch, page.currentPage, perPage);
  }, [dispatch, page.currentPage, perPage]);

  const handlePrevPage = () => {
    if (page.currentPage > 1) {
      dispatch(
        updatedPage({
          currentPage: page.currentPage - 1,
          totalPage: page.totalPage,
        })
      );
    }
  };

  const handleNextPage = () => {
    if (page.currentPage < page.totalPage) {
      dispatch(
        updatedPage({
          currentPage: page.currentPage + 1,
          totalPage: page.totalPage,
        })
      );
    }
  };

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
        <Button title="Previous" iconPosition="top" onClick={handlePrevPage}>
          <GrPrevious />
        </Button>
        <Gap width={20} />
        <p className="text-page">
          {page?.currentPage ?? 0} / {page?.totalPage ?? 0}
        </p>
        <Gap width={20} />
        <Button title="Next" iconPosition="bottom" onClick={handleNextPage}>
          <GrNext />
        </Button>
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Home;
