
export const getQueryParamsString = (keys: Record<string, number>[]): string => {
  const queryParams = new URLSearchParams(window.location.search);
  keys.forEach(k => {
    for (let f in k) {
      if (f !== 'id') {
        queryParams.set(f, String(k[f]))
      }
    }
  });
  queryParams.delete('id');
  return '?' + queryParams.toString();
}

export const getKeyFromSerachParam = (keyName: string): number => {
  const queryParams = new URLSearchParams(window.location.search);
  const val = queryParams.get(keyName);
  if (val !== null) {
    return +val;
  } else {
    return 0;
  }
}
