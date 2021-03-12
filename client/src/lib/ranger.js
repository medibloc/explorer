const ranger = (page, contentsInPage) => {
  let from = (page - 1) * contentsInPage;
  let to = (page * contentsInPage) - 1;
  if (from < 0) from = 0;
  if (to < from) to = from;
  return { from, to };
};

export default ranger;
