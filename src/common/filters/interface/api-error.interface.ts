export interface ApiError {
  code: number;

  internalCode?: string;

  key: string;

  message: string | Record<string, unknown>;

  context?: any;
}
