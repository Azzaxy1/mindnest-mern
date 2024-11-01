export interface CustomError extends Error {
  errorStatus?: number;
  data?: any;
}
