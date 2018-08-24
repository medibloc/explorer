
export const getFromTo = (page, size) => { // eslint-disable-line import/prefer-default-export
  const from = (page - 1) * size;
  const to = from + size - 1;
  return { from, to };
};
