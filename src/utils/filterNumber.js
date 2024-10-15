export default (value) => {
  if (value === null || value === undefined) {
    return 0;
  }
  return ~~value.toString().replace(/[^0-9]/g, '');
};
