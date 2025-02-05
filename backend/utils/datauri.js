const dataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (file) => {
  const parser = new dataUriParser();
  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
