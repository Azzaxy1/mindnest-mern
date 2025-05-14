import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import Swall from "sweetalert2";
import { JournalItem } from "../../components";
import {
  fetchJournals,
  fetchDeleteJournal,
} from "../../services/journalService";
import { IHomeState } from "../../types/homeTypes";
import { updatedPage } from "../../config";
import { TbMoodEmptyFilled } from "react-icons/tb";

const Home = () => {
  const dispatch = useDispatch();
  const perPage = 6;

  const { dataJournals, page } = useSelector((state: IHomeState) => state.home);

  useEffect(() => {
    fetchJournals(dispatch, page.currentPage, perPage);
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

  const handleDeleteJournal = (id: string) => {
    Swall.fire({
      title: "Are you sure you want to delete?",
      text: "Once deleted, this journal entry cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDeleteJournal(id)
          .then(() => {
            Swall.fire({
              title: "Deleted!",
              text: "Your journal entry has been successfully deleted.",
              icon: "success",
              confirmButtonText: "Okay",
              background: "#1f2937",
              color: "#fff",
            });
            fetchJournals(dispatch, page.currentPage, perPage);
          })
          .catch((err) => {
            console.log("err:", err);
            Swall.fire({
              title: "Failed!",
              text: "There was an error deleting the journal entry.",
              icon: "error",
              confirmButtonText: "Okay",
              background: "#1f2937",
              color: "#fff",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Create journal Button */}
      <div className="flex justify-end mb-8">
        <Link
          to="/updated-journal"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaPlus className="mr-2" />
          Create Your Journal
        </Link>
      </div>

      {/* journal Content */}
      <div className="mb-12">
        {dataJournals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <TbMoodEmptyFilled className="text-6xl text-gray-500 mb-4" />
            <h3 className="text-2xl font-medium text-gray-300 mb-2">
              Your journal is still empty.
            </h3>
            <p className="text-gray-500 max-w-md">
              Start reflecting on your thoughts by creating your first entry.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataJournals.map((journal, index) => (
              <JournalItem
                key={index}
                journal={journal}
                onDelete={handleDeleteJournal}
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
          } transition-all cursor-pointer`}
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
              ? "bg-gray-800 text-gray-500  cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
          } transition-all cursor-pointer`}
        >
          Next
          <GrNext className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Home;
