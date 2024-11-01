export interface CustomError extends Error {
  errorStatus?: number;
  data?: any;
}

export interface IBLog {
  title: string;
  image: string;
  body: string;
}
