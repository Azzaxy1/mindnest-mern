import { Button, Gap, Input, TextArea, Upload } from "../../components";
import "./createBlog.scss";

const CreateBlog = () => {
  return (
    <div className="create-blog">
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
