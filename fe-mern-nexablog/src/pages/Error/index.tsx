import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#3085d6]">Ooops!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Sorry, an unexpected error has occurred.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 px-4 cursor-pointer mt-10 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
