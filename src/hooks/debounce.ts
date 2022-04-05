export default (func: any, delay: any) => {
  // inDebounce is closer
  let inDebounce: any; // timeoutID

  return (...args: any) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  }
}