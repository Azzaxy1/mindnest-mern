import axios from "axios";
import { updatedDataBlog } from "../config";
import { Dispatch } from "redux";
import { updatedPage } from "../config/redux/reducers/homeSlice";
import { NavigateFunction } from "react-router-dom";
import { getAccessToken } from "../utils";

const blogUrl = `${import.meta.env.VITE_URL_API}`;

const fetchBlogs = (dispatch: Dispatch, page: number, perPage: number) => {
  axios
    .get(`${blogUrl}/blog?page=${page}&perPage=${perPage}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
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
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

const fetchBlogById = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${blogUrl}/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.log("err: ", err);
  }
};

const fetchUpdateBlog = async (
  id: string | undefined,
  data: FormData,
  navigate: NavigateFunction
) => {
  try {
    await axios.put(`${blogUrl}/blog/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    navigate("/");
  } catch (err) {
    console.log("err: ", err);
  }
};

const fetchDeleteBlog = async (id: string | undefined) => {
  try {
    await axios.delete(`${blogUrl}/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (err) {
    console.log("err: ", err);
  }
};

export {
  fetchBlogs,
  fetchAddBlog,
  fetchUpdateBlog,
  fetchBlogById,
  fetchDeleteBlog,
};
