import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Button, Gap, Input, TextArea, Upload } from "../../components";
import "./createBlog.scss";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  return (
    <div className="create-blog">
      <div className="back-btn">
        <Button iconPosition="top" title="Kembali" onClick={() => navigate(-1)}>
          <IoChevronBackCircleOutline className="icon" />
        </Button>
      </div>
      <p className="title">Create New Blog Post</p>
      <Input label="Post Title" name="create-blog" />
      <Upload />
      <TextArea />
      <Gap height={20} />
      <div className="btn-create">
        <Button title="Save" />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default CreateBlog;
