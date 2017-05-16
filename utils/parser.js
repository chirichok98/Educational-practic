function parseDate(date) {
  if (date === 'NaN') return null;
  return Number(date);
}

module.exports = {
  parseDate,
};
