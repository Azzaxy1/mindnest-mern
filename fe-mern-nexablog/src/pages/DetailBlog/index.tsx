import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Button } from "../../components";
import "./detailBlog.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogById } from "../../services/blogService";
import { formatedDate } from "../../utils";
import { IBLog } from "../../types/blogTypes";

const DetailBlog = () => {
  const [blog, setBlog] = useState<IBLog | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogById(id).then((res) => {
      setBlog(res);
    });
  }, [id]);

  return (
    <div className="detail-blog-wrapper">
      <img
        className="img-cover"
        src={`${import.meta.env.VITE_URL_ROOT}/${blog?.image}`}
        alt="thumb"
      />
      <p className="blog-title">{blog?.title}</p>
      <p className="blog-author">
        {blog?.author?.name} -{" "}
        {blog?.createdAt && formatedDate(blog?.createdAt)}
      </p>
      <p className="blog-body">{blog?.body}</p>
      <div className="back-btn">
        <Button iconPosition="top" title="Kembali" onClick={() => navigate(-1)}>
          <IoChevronBackCircleOutline className="icon" />
        </Button>
      </div>
    </div>
  );
};

export default DetailBlog;
