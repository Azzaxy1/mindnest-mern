import axios from "axios";
import { updatedDataJournal } from "../config";
import { Dispatch } from "redux";
import { updatedPage } from "../config/redux/reducers/homeSlice";
import { NavigateFunction } from "react-router-dom";
import { getAccessToken } from "../utils";

const apiUrl = `${import.meta.env.VITE_URL_API}`;

const fetchJournals = (dispatch: Dispatch, page: number, perPage: number) => {
  axios
    .get(`${apiUrl}/journal?page=${page}&perPage=${perPage}`, {
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
      dispatch(updatedDataJournal(response.data));
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
const fetchAddJournal = (data: FormData, navigate: NavigateFunction) => {
  axios
    .post(`${apiUrl}/journal`, data, {
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

const fetchJournalById = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${apiUrl}/journal/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.log("err: ", err);
  }
};

const fetchUpdateJournal = async (
  id: string | undefined,
  data: FormData,
  navigate: NavigateFunction
) => {
  try {
    await axios.put(`${apiUrl}/journal/${id}`, data, {
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

const fetchDeleteJournal = async (id: string | undefined) => {
  try {
    await axios.delete(`${apiUrl}/journal/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (err) {
    console.log("err: ", err);
  }
};

export {
  fetchJournals,
  fetchAddJournal,
  fetchUpdateJournal,
  fetchJournalById,
  fetchDeleteJournal,
};
