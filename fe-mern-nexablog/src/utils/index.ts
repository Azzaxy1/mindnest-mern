export const formatedDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const addAccessToken = (token: string) => {
  return localStorage.setItem("token", token);
};

export { getAccessToken, addAccessToken };
