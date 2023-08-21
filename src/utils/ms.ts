const YEAR = 31536000000;
const MONTH = YEAR / 12;
const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;
const SEC = 1000;


export const calcTime = (ms: number): string => {
  const currentMs = new Date().getTime();
  const delta = currentMs - ms;
  let str = '';
  if (delta > YEAR) {
    str = `${Math.trunc(delta / YEAR)} ${Math.trunc(delta / YEAR) === 1 ? ' year' : ' years'}`;
  } else if (delta > MONTH) {
    str = `${Math.trunc(delta / MONTH)} ${Math.trunc(delta / MONTH) === 1 ? ' month' : ' months'}`;
  } else if (delta > DAY) {
    str = `${Math.trunc(delta / DAY)} ${Math.trunc(delta / DAY) === 1 ? ' day' : ' days'}`;
  } else if (delta > HOUR) {
    str = `${Math.trunc(delta / HOUR)} ${Math.trunc(delta / HOUR) === 1 ? ' hour' : ' hours'}`;
  } else if (delta > MINUTE) {
    str = `${Math.trunc(delta / MINUTE)} ${Math.trunc(delta / MINUTE) === 1 ? ' minute' : ' minutes'}`;
  } else if (delta > SEC) {
    str = `${Math.trunc(delta / SEC)} ${Math.trunc(delta / SEC) === 1 ? ' second' : ' seconds'}`;
  }
  return str;
} 