const titleConverter = (title) => {
  let convertedTitle = title.split(/[ .]/)[0].toLowerCase();
  if (title.split(/[ .]/)[1]) convertedTitle += title.split(/[ .]/)[1];
  return convertedTitle;
};

export default titleConverter;
