import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useState } from "react";

import { Button, Gap, Input, TextArea, Upload } from "../../components";
import { fetchAddBlog } from "../../services/blogService";
import "./createBlog.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedForm } from "../../config";
import { CreateBlogState } from "../../types/createBlogTypes";

interface ICreateBLogState {
  createBlog: CreateBlogState;
}

const CreateBlog = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form } = useSelector((state: ICreateBLogState) => state.createBlog);
  const { title, body } = form;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      dispatch(setUpdatedForm({ ...form, image: file.name }));
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
        onChange={(e) =>
          dispatch(setUpdatedForm({ ...form, title: e.target.value }))
        }
        label="Post Title"
        name="create-blog"
      />
      <Upload onChange={handleFileChange} image={previewUrl} />
      <TextArea
        value={body}
        onChange={(e) =>
          dispatch(setUpdatedForm({ ...form, body: e.target.value }))
        }
      />
      <Gap height={20} />
      <div className="btn-create">
        <Button title="Save" onClick={handleClick} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default CreateBlog;
