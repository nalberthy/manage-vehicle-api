export abstract class ValidationUtil {
  static isErrorInstanceOf<T extends Error>(
    error: any,
    type: new (...args: any[]) => T,
  ): error is T {
    return error instanceof type;
  }
}
