export type HttpClientError = {
  status: number;
  statusText: string;
};

export interface ServiceError {
  status: number;
  message: string;
}
