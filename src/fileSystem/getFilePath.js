import path from 'node:path';

const getFilePath = () => {
  let filePath = 'movielist.csv';

  const fileArg = process.argv.find(
    (arg) => arg.startsWith('--file=') && arg.endsWith('.csv'),
  );

  if (fileArg) {
    [, filePath] = fileArg.split('=');
  }

  return path.resolve(filePath);
};

export default getFilePath;
