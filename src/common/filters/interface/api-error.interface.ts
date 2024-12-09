export interface ApiError {
  code: number;

  statusCode?: number;

  key: string;

  message: string | Record<string, unknown>;

  context?: any;
}
