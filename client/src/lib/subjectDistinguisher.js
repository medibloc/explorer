const subjectDistinguisher = (string) => {
  if (/[a-z]+/g.test(string.toLowerCase())) {
    if (string.length === 64) return 'hash';
    if (string.length === 66) return 'account';
    return false;
  }
  if (/^[0-9]+$/g.test(string)) return 'height';
  return false;
};

export default subjectDistinguisher;
