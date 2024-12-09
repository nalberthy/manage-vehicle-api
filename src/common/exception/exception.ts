export class Exception extends Error {
  constructor(
    public code: number,
    public statusCode: string,
    public key: string,
    public message: string,
    public context?: any,
    clazz?: new (...args: any[]) => Exception,
  ) {
    super(message);
    Object.setPrototypeOf(this, clazz.prototype);
  }
}
