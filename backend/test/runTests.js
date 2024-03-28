import { glob } from 'glob';
import path from 'path';

let filePath = ['test/**/*.test.js'];

if (process.argv.length > 2) {
  [,, ...filePath] = process.argv;
}

const files = await glob(filePath);

files.forEach((file) => {
  import(path.resolve(file));
});
