import { Link } from "react-router-dom";
import { BlogItem, Button, Gap } from "../../components";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";

import "./home.scss";

const Home = () => {
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
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
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
