export function toPromise<T>(value: T) {
  return new Promise<T>(resolve => resolve(value));
}
