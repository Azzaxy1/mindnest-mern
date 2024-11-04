import { Link } from "react-router-dom";
import { Button } from "../../atoms";
import "./blogItem.scss";
import { TbListDetails } from "react-icons/tb";
import { IBLog } from "../../../types/blog";
import { formatedDate } from "../../../utils";

interface BlogProps {
  blog: IBLog;
}

const BlogItem = ({ blog }: BlogProps) => {
  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="blog-item">
      <img
        className="image-thumb"
        src={`${import.meta.env.VITE_URL_ROOT}/${blog.image}`}
        alt={blog.title}
      />
      <div className="content-detail">
        <p className="title">{blog.title}</p>
        <p className="author">
          {blog.author.name} - {formatedDate(blog.createdAt)}
        </p>
        <p className="body">{truncateText(blog.body, 100)}</p>
      </div>
      <Link className="link" to="detail-blog">
        <Button title="View Detail" iconPosition="bottom">
          <TbListDetails />
        </Button>
      </Link>
    </div>
  );
};

export default BlogItem;
