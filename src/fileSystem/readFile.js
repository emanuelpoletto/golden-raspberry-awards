import fs from 'node:fs/promises';

const ENCODING = 'utf-8';
const SEPARATOR = '\n';

const readFile = async (filePath) => {
  const fileContent = await fs.readFile(filePath, ENCODING);
  const fileRows = fileContent.split(SEPARATOR);
  return fileRows;
};

export default readFile;
