export function debounce(fn: any, wait: number) {
  let timeout: any;

  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function _debounce(fn: any, wait: number) {
  let timer: any;
  return function (...args: any) {
    //@ts-ignore
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(context, args);
    }, wait);
  };
}
