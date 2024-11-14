import { Link } from "react-router-dom";
import { Button } from "../../atoms";
import "./blogItem.scss";
import { TbListDetails } from "react-icons/tb";
import { IBLog } from "../../../types/blogTypes";
import { formatedDate } from "../../../utils";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

interface BlogProps {
  blog: IBLog;
  onDelete: (id: string) => void;
}

const BlogItem = ({ blog, onDelete }: BlogProps) => {
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
        <div className="title-wrapper">
          <p className="title">{blog.title}</p>
          <div className="edit-wrapper">
            <Link to={`create-blog/${blog._id}`}>
              <FaEdit className="edit-icon" />
            </Link>{" "}
            |
            <RiDeleteBin6Fill
              className="delete-icon"
              onClick={() => onDelete(blog._id)}
            />
          </div>
        </div>
        <p className="author">
          {blog.author.name} - {formatedDate(blog.createdAt)}
        </p>
        <p className="body">{truncateText(blog.body, 100)}</p>
      </div>
      <Link className="link" to={`detail-blog/${blog._id}`}>
        <Button title="View Detail" iconPosition="bottom">
          <TbListDetails />
        </Button>
      </Link>
    </div>
  );
};

export default BlogItem;
