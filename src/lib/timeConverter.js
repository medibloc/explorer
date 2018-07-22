const timeConverter = (time) => {
  // Incase that time unit is "ms"
  let timeString = time;
  switch (typeof time) {
    case 'string':
      timeString = parseInt(time, 10);
      break;
    default:
      break;
  }
  if (timeString.toString().length === 13) timeString = Math.floor(time / 1000);
  const timeGap = Math.floor(Date.now() / 1000) - timeString;

  switch (true) {
    case (timeGap < 0):
      return '0 sec ago';
    case (timeGap < 60):
      return `${timeGap} sec ago`;
    case (timeGap < 60 * 60):
      return `${Math.floor(timeGap / 60)} min ago`;
    case (timeGap < 60 * 60 * 24):
      return `${Math.floor(timeGap / 60 / 60)} hr ago`;
    case (timeGap < 60 * 60 * 24 * 30):
      return `${Math.floor(timeGap / 60 / 60 / 24)} day ago`;
    case (timeGap < 60 * 60 * 24 * 30 * 12):
      return `${Math.floor(timeGap / 60 / 60 / 24 / 30)} mo ago`;
    case (timeGap >= 60 * 60 * 24 * 30 * 12):
      return `${Math.floor(timeGap / 60 / 60 / 24 / 30 / 12)} yr ago`;
    default:
      return 'ERROR';
  }
};

export default timeConverter;
