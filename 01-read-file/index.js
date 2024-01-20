import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'text.txt');

const readable = createReadStream(filePath);

readable.on('data', (chunk) => {
  process.stdout.write(chunk + '\n');
});
