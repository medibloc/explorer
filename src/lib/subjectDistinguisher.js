const subjectDistinguisher = (string) => {
  if (string.toLowerCase().match(/[a-z]+/g)) {
    if (string.length === 64) return 'hash';
    if (string.length === 66) return 'address';
    return false;
  }
  if (string.match(/^[0-9]+$/g)) return 'height';
  return false;
};

export default subjectDistinguisher;
