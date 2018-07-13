const sorter = (objectArray, topic) => {
  const compare = (a, b) => Number(b[topic]) - Number(a[topic]);
  return objectArray.sort(compare);
};


export default sorter;
