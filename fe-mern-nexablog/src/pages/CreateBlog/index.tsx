import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useState } from "react";

import { Button, Gap, Input, TextArea, Upload } from "../../components";
import { fetchAddBlog } from "../../services/blogService";
import useInput from "../../hooks/useInput";
import "./createBlog.scss";

const CreateBlog = () => {
  const [title, onChangeTitle] = useInput("");
  const [body, onChangeBody] = useInput("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  console.log("imageFile:", imageFile && imageFile.name);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    fetchAddBlog(formData, navigate);
  };

  return (
    <div className="create-blog">
      <div className="back-btn">
        <Button iconPosition="top" title="Kembali" onClick={() => navigate(-1)}>
          <IoChevronBackCircleOutline className="icon" />
        </Button>
      </div>
      <p className="title">Create New Blog Post</p>
      <Input
        value={title}
        onChange={onChangeTitle}
        label="Post Title"
        name="create-blog"
      />
      <Upload onChange={handleFileChange} image={previewUrl} />
      <TextArea value={body} onChange={onChangeBody} />
      <Gap height={20} />
      <div className="btn-create">
        <Button title="Save" onClick={handleClick} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default CreateBlog;
