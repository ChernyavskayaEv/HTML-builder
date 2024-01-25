import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'text.txt');

const writeable = createWriteStream(filePath);

process.stdout.write('Hello! To write some information to a file, enter it here:' + '\n');


process.stdin.on('data', chunk => {
  if (chunk.toString().trim().toLowerCase() == 'exit') {
    process.stdout.write('\n' + 'Thank you, your information is recorded in a file. Goodbay!' + '\n');
    process.exit(0);
  }
});
process.stdin.pipe(writeable);
process.on('SIGINT', () => {
  process.stdout.write('\n' + 'Thank you, your information is recorded in a file. Goodbay!' + '\n');
  process.exit(0);
})

