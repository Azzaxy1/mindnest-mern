import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogById } from "../../services/blogService";
import { formatedDate } from "../../utils";
import { IBLog } from "../../types/blogTypes";
import { TbArrowBack } from "react-icons/tb";

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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 cursor-pointer hover:text-white mb-8 transition-colors duration-300"
        >
          <TbArrowBack className="mr-2" />
          <span>Kembali</span>
        </button>

        {/* Blog Content */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
          {/* Blog Image */}
          <div className="relative h-80 md:h-96 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`${import.meta.env.VITE_URL_ROOT}/${blog?.image}`}
              alt={blog?.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
          </div>

          {/* Blog Details */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                {blog?.title}
              </h1>
              <p className="text-gray-400">
                Oleh {blog?.author?.name} •{" "}
                {blog?.createdAt && formatedDate(blog?.createdAt)}
              </p>
            </div>

            <article className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
                {blog?.body}
              </p>
            </article>
          </div>
        </div>

        {/* Floating Back Button (mobile) */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg border border-gray-700 transition-all duration-300"
            aria-label="Kembali"
          >
            <TbArrowBack className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
