import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Input, TextArea, Upload } from "../../components";
import {
  fetchAddjournal,
  fetchjournalById,
  fetchUpdatejournal,
} from "../../services/journalService";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedForm } from "../../config";
import { CreateJournalState } from "../../types/createJournalTypes";
import Swal from "sweetalert2";
import { resetForm } from "../../config/redux/reducers/createJournalSlice";
import { TbArrowBack } from "react-icons/tb";

interface ICreateJournalState {
  createJournal: CreateJournalState;
}

const CreateJournal = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form } = useSelector(
    (state: ICreateJournalState) => state.createJournal
  );
  const { title, body } = form;

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      fetchjournalById(id).then((data) => {
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

  const handleSubmit = () => {
    if (!title || !body) {
      Swal.fire({
        title: "Error!",
        text: "Title and content cannot be empty",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1f2937",
        color: "#fff",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isUpdate) {
      Swal.fire({
        title: "Update Journal!",
        text: "Journal has been successfully updated.",
        icon: "success",
        confirmButtonText: "Okay",
      });
      fetchUpdatejournal(id, formData, navigate);
    } else {
      Swal.fire({
        title: "Create Journal!",
        text: "Journal has been successfully created.",
        icon: "success",
        confirmButtonText: "Okay",
      });
      fetchAddjournal(formData, navigate);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors duration-300"
          >
            <TbArrowBack className="mr-2 text-xl" />
            <span>Go Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            {isUpdate ? "Update" : "Create New"} Journal Entry
          </h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700 shadow-lg">
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Journal Title
              <span className="text-xs text-gray-500 block mt-1">
                Give your journal entry a meaningful title
              </span>
            </label>
            <Input
              value={title}
              onChange={(e) =>
                dispatch(setUpdatedForm({ ...form, title: e.target.value }))
              }
              name="journal-title"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter journal title"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Featured Image
              <span className="text-xs text-gray-500 block mt-1">
                Upload a featured image for your entry
              </span>
            </label>
            <Upload
              onChange={handleFileChange}
              image={previewUrl}
              className="border-2 border-dashed border-gray-600 hover:border-blue-500 rounded-lg transition-all duration-300"
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
              <span className="text-xs text-gray-500 block mt-1">
                Share your thoughts and reflections
              </span>
            </label>
            <TextArea
              value={body}
              onChange={(e) =>
                dispatch(setUpdatedForm({ ...form, body: e.target.value }))
              }
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white min-h-[200px]"
              placeholder="Write your journal content here..."
            />
          </div>

          {/* Submit Button */}
          <Button
            title={isUpdate ? "Update Entry" : "Publish Entry"}
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
