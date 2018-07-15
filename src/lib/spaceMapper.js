const spaceMapper = (spaceList) => {
  const convertedSpaceList = [];
  let spaceTotal = 0;
  spaceList.forEach((space) => {
    spaceTotal += space;
  });
  spaceList.forEach(space => convertedSpaceList.push(100 * space / spaceTotal));
  return convertedSpaceList;
};


export default spaceMapper;
