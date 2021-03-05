export const getImgUrl = (path: string, width: number) => {
  return `http://image.tmdb.org/t/p/w${width}${path}`;
};
