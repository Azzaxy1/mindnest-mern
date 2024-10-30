import { Link } from "react-router-dom";
import { RegisterBg } from "../../../assets";
import { Button } from "../../atoms";
import "./blogItem.scss";

const BlogItem = () => {
  return (
    <div className="blog-item">
      <img className="image-thumb" src={RegisterBg} alt="post" />
      <div className="content-detail">
        <p className="title">Title</p>
        <p className="author">Author - Date Post</p>
        <p className="body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae in,
          perspiciatis ut sunt illum possimus.
        </p>
      </div>
      <Link to="detail-blog">
        <Button title="View Detail" />
      </Link>
    </div>
  );
};

export default BlogItem;
