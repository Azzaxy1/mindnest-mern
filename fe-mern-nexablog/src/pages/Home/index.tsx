import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import Swall from "sweetalert2";
import { BlogItem } from "../../components";
import { fetchBlogs, fetchDeleteBlog } from "../../services/blogService";
import { IHomeState } from "../../types/homeTypes";
import { updatedPage } from "../../config";
import { TbMoodEmptyFilled } from "react-icons/tb";

const Home = () => {
  const dispatch = useDispatch();
  const perPage = 4;

  const { dataBlogs, page } = useSelector((state: IHomeState) => state.home);

  useEffect(() => {
    fetchBlogs(dispatch, page.currentPage, perPage);
  }, [dispatch, page.currentPage, perPage]);

  const handlePrevPage = () => {
    if (page.currentPage > 1) {
      dispatch(
        updatedPage({
          currentPage: page.currentPage - 1,
          totalPage: page.totalPage,
        })
      );
    }
  };

  const handleNextPage = () => {
    if (page.currentPage < page.totalPage) {
      dispatch(
        updatedPage({
          currentPage: page.currentPage + 1,
          totalPage: page.totalPage,
        })
      );
    }
  };

  const handleDeleteBlog = (id: string) => {
    Swall.fire({
      title: "Yakin ingin menghapus blog ini?",
      text: "Blog yang sudah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDeleteBlog(id)
          .then(() => {
            Swall.fire({
              title: "Dihapus!",
              text: "Blog berhasil dihapus",
              icon: "success",
              confirmButtonText: "Oke",
              background: "#1f2937",
              color: "#fff",
            });
            fetchBlogs(dispatch, page.currentPage, perPage);
          })
          .catch((err) => {
            console.log("err:", err);
            Swall.fire({
              title: "Gagal!",
              text: "Blog gagal dihapus",
              icon: "error",
              confirmButtonText: "Oke",
              background: "#1f2937",
              color: "#fff",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Create Blog Button */}
      <div className="flex justify-end mb-8">
        <Link
          to="/create-blog"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaPlus className="mr-2" />
          Create Blog
        </Link>
      </div>

      {/* Blog Content */}
      <div className="mb-12">
        {dataBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <TbMoodEmptyFilled className="text-6xl text-gray-500 mb-4" />
            <h3 className="text-2xl font-medium text-gray-300 mb-2">
              Data Blog Kosong
            </h3>
            <p className="text-gray-500 max-w-md">
              Tidak ada blog yang tersedia. Mulai dengan membuat blog baru!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataBlogs.map((blog, index) => (
              <BlogItem
                key={index}
                blog={blog}
                onDelete={handleDeleteBlog}
                className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={handlePrevPage}
          disabled={page.currentPage <= 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            page.currentPage <= 1
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
          } transition-all`}
        >
          <GrPrevious className="mr-2" />
          Previous
        </button>

        <span className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          {page?.currentPage ?? 0} / {page?.totalPage ?? 0}
        </span>

        <button
          onClick={handleNextPage}
          disabled={page.currentPage >= page.totalPage}
          className={`flex items-center px-4 py-2 rounded-lg ${
            page.currentPage >= page.totalPage
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
          } transition-all`}
        >
          Next
          <GrNext className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Home;
