const timezoneMatcher = (unixTime) => {
  if (unixTime.toString().length === 13) unixTime = Math.floor(unixTime / 1000);
  const offset = new Date().getTimezoneOffset();

  let date = new Date(unixTime * 1000 - offset * 60 * 1000);
  date = date.toISOString().replace(/T/g, ' ').replace(/\..*/g, '');
  date += ` (UTC+${Math.floor(-offset / 60)})`;

  return date;
};

export default timezoneMatcher;
