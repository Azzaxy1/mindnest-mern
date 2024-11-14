import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

import { Button, Gap, Input, TextArea, Upload } from "../../components";
import {
  fetchAddBlog,
  fetchBlogById,
  fetchUpdateBlog,
} from "../../services/blogService";
import "./createBlog.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedForm } from "../../config";
import { CreateBlogState } from "../../types/createBlogTypes";
import Swal from "sweetalert2";
import { resetForm } from "../../config/redux/reducers/createBlogSlice";

interface ICreateBLogState {
  createBlog: CreateBlogState;
}

const CreateBlog = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form } = useSelector((state: ICreateBLogState) => state.createBlog);
  const { title, body } = form;

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      fetchBlogById(id).then((data) => {
        setPreviewUrl(`${import.meta.env.VITE_URL_ROOT}/${data.image}`);
        dispatch(
          setUpdatedForm({
            ...data,
            image: data.image,
            body: data.body,
            title: data.title,
          })
        );
      });
    } else {
      setIsUpdate(false);
      dispatch(resetForm());
    }
  }, [id, dispatch]);

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
    if (isUpdate) {
      Swal.fire({
        title: "Update Blog!",
        text: "Berhasil mengubah blog",
        icon: "success",
        confirmButtonText: "Oke",
      });
      fetchUpdateBlog(id, formData, navigate);
    } else {
      Swal.fire({
        title: "Create Blog!",
        text: "Berhasil membuat blog",
        icon: "success",
        confirmButtonText: "Oke",
      });
      fetchAddBlog(formData, navigate);
    }
  };

  return (
    <div className="create-blog">
      <div className="back-btn">
        <Button iconPosition="top" title="Kembali" onClick={() => navigate(-1)}>
          <IoChevronBackCircleOutline className="icon" />
        </Button>
      </div>
      <p className="title">{isUpdate ? "Update" : "Create New"} Blog Post</p>
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
        <Button title={isUpdate ? "Update" : "Save"} onClick={handleClick} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default CreateBlog;
