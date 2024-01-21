import { readdir, stat } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, 'secret-folder');

const list = async () => {
  try {
    const dirContent = await readdir(folderPath);
    dirContent.forEach(async item => {
      const stats = await stat(path.join(folderPath, item));
      if(stats.isFile()) {
        console.log(item.replace('.', ' - ').concat(` - ${stats.size/1000}kb`));
      }
    })
  } catch (err) {
    console.error(err);
  }
};

await list();
