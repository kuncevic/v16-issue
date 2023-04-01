// ref: https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
