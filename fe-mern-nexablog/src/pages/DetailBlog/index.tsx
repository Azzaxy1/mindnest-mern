import { RegisterBg } from "../../assets";
import "./detailBlog.scss";

const DetailBlog = () => {
  return (
    <div className="detail-blog-wrapper">
      <img className="img-cover" src={RegisterBg} alt="thumb" />
      <p className="blog-title">Title</p>
      <p className="blog-author">Author - Date Post</p>
      <p className="blog-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        possimus error id magni odio provident, debitis repellat? Sint, quidem
        amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        modi similique dolorem ducimus repudiandae perferendis!.
      </p>
    </div>
  );
};

export default DetailBlog;
