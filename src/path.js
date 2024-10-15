const filePathToUrl = (path) => {
  path = path.replaceAll('\\', '/');
  var drive = /(.)\:\//;
  return path.replace(drive, 'file:///$1:/');
};

module.exports = {
  filePathToUrl,
}