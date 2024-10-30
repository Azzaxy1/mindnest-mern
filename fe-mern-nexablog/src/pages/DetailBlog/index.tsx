import { IoChevronBackCircleOutline } from "react-icons/io5";
import { RegisterBg } from "../../assets";
import { Button } from "../../components";
import "./detailBlog.scss";
import { useNavigate } from "react-router-dom";

const DetailBlog = () => {
  const navigate = useNavigate();

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
      <div className="back-btn">
        <Button iconPosition="top" title="Kembali" onClick={() => navigate(-1)}>
          <IoChevronBackCircleOutline className="icon" />
        </Button>
      </div>
    </div>
  );
};

export default DetailBlog;
