const ranger = (page, amount, contentsInPage) => {
  if (amount < contentsInPage) return { from: 0, to: amount };
  let from = (page - 1) * contentsInPage;
  let to = (page * contentsInPage) - 1;
  if (from < 0) from = 0;
  if (to < from) to = from;
  return { from, to };
};

export default ranger;
