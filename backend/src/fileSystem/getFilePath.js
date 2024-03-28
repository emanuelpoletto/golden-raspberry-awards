import path from 'node:path';
import { DEFAULT_FILE } from '../constants.js';

const getFilePath = (file = DEFAULT_FILE) => {
  let filePath = file;

  const fileArg = process.argv.find(
    (arg) => arg.startsWith('--file=') && arg.endsWith('.csv'),
  );

  if (fileArg) {
    [, filePath] = fileArg.split('=');
  }

  return path.resolve(filePath);
};

export default getFilePath;
