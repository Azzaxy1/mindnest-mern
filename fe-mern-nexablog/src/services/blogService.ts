import axios from "axios";
import { updatedDataBlog } from "../config";
import { Dispatch } from "redux";
import { updatedPage } from "../config/redux/reducers/homeSlice";
import { NavigateFunction } from "react-router-dom";

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
const fetchAddBlog = (data: FormData, navigate: NavigateFunction) => {
  axios
    .post(`${blogUrl}/blog`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("res:", res);
      navigate("/");
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

export { fetchBlogs, fetchAddBlog };
