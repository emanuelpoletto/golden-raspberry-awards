import fs from 'node:fs/promises';
import { DEFAULT_ENCODING, DEFAULT_LINE_BREAK } from '../constants.js';

const readFile = async (
  filePath,
  encoding = DEFAULT_ENCODING,
  lineBreak = DEFAULT_LINE_BREAK,
) => {
  const fileContent = await fs.readFile(filePath, encoding);
  const fileRows = fileContent.split(lineBreak);
  return fileRows;
};

export default readFile;
