const sorter = (objectArray, topic, reverse = false) => {
  const r = reverse ? -1 : 1;
  const compare = (a, b) => r * (Number(b[topic]) - Number(a[topic]));
  return objectArray.sort(compare);
};


export default sorter;
