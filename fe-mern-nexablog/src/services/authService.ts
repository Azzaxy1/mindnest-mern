import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";

const blogUrl = `${import.meta.env.VITE_URL_API}`;

const fetchLogin = async (
  data: { email: string; password: string },
  navigate: NavigateFunction
) => {
  console.log("data:", data);
  try {
    const res = await axios.post(`${blogUrl}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", res.data.data.token);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "Welcome to NexaBlog",
      });
      navigate("/");
    }
    const { token } = res.data.data;

    return token;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || "An error occurred";
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: errorMessage,
    });
    console.log("err: ", err);
  }
};

const fetchRegister = async (
  data: { name: string; email: string; password: string },
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${blogUrl}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Register Success",
        text: "Please login to continue",
      });
      navigate("/login");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || "An error occurred";
    Swal.fire({
      icon: "error",
      title: "Register Failed",
      text: errorMessage,
    });
  }
};

const fetchUserLogged = async () => {
  const res = await axios.get(`${blogUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

export { fetchLogin, fetchRegister, fetchUserLogged };
