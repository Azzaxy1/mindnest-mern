import axios from "axios";
import { updatedDataBlog } from "../config";
import { Dispatch } from "redux";
import { updatedPage } from "../config/redux/reducers/homeSlice";

const blogUrl = `${import.meta.env.VITE_URL_API}`;

const fetchBlogs = (dispatch: Dispatch, page: number, perPage: number) => {
  axios
    .get(`${blogUrl}/blog?page=${page}&perPage=${perPage}`)
    .then((res) => {
      const response = res.data;
      dispatch(
        updatedPage({
          currentPage: response.current_page,
          totalPage: Math.ceil(response.total_data / response.per_page),
        })
      );
      dispatch(updatedDataBlog(response.data));
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

export { fetchBlogs };
