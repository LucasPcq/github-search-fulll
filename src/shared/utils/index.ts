export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...funcArgs: Parameters<T>) => void) => {
  let timerId: number | null = null;

  return (...args: Parameters<T>): void => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
