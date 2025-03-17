export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export interface ErrorResponse {
  message: string;
  code: number;
}
