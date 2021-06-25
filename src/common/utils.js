export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // console.log(this);
      // console.log(args);
      func.apply(this, args);
    }, delay)
  }
}