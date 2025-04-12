export interface IApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  data: T;
  message: string;
}

export interface IApiError {
  statusCode: number;
  message: string;
  data: null;
  success: false;
  errors: any[];
}
