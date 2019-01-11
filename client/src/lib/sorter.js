const sorter = (objectArray, topic, reverse = false) => {
  const r = reverse ? -1 : 1;
  const path = topic.split('.');
  const getNestedObj = (nestedObj, pathArr) => pathArr
    .reduce((obj, key) => ((obj && obj[key] !== 'undefined') ? obj[key] : undefined), nestedObj);
  const compare = (a, b) => r * (Number(getNestedObj(b, path) - Number(getNestedObj(a, path))));
  return objectArray.sort(compare);
};

export default sorter;
