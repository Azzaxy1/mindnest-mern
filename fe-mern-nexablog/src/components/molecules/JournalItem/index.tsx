import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { IJournal } from "../../../types/journalTypes";
import { formatedDate } from "../../../utils";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

interface JournalProps {
  journal: IJournal;
  onDelete: (id: string) => void;
  className?: string;
}

const JournalItem = ({ journal, onDelete, className = "" }: JournalProps) => {
  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div
      className={`relative flex flex-col h-full overflow-hidden group ${className}`}
    >
      {/* journal Image */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={`${import.meta.env.VITE_URL_ROOT}/${journal.image}`}
          alt={journal.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-3">
            <Link
              to={`create-journal/${journal._id}`}
              className="p-2 bg-gray-800/80 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Edit"
            >
              <FaEdit className="text-gray-300 hover:text-white" />
            </Link>
            <button
              onClick={() => onDelete(journal._id)}
              className="p-2 bg-gray-800/80 cursor-pointer hover:bg-red-600 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Delete"
            >
              <RiDeleteBin6Fill className="text-gray-300 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* journal Content */}
      <div className="flex-1 p-6 bg-gray-800 border border-gray-700 border-t-0 rounded-b-lg">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white line-clamp-1">
            {journal.title}
          </h3>
        </div>

        <p className="text-sm text-gray-400 mb-3">
          {journal.author.name} • {formatedDate(journal.createdAt)}
        </p>

        <p className="text-gray-300  line-clamp-3 h-[100px] mb-2">
          {truncateText(journal.body, 150)}
        </p>

        <Link
          to={`detail-journal/${journal._id}`}
          className="inline-flex w-full justify-center items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 group/view"
        >
          <span>View Detail</span>
          <TbListDetails className="ml-2 transition-transform duration-300 group-hover/view:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default JournalItem;
