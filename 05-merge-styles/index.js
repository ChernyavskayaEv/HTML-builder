import { readdir, stat, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, 'styles');
const fileStylesPath = path.resolve(__dirname, 'project-dist', 'bundle.css');

const list = async () => {
  try {
    const dirContent = await readdir(folderPath);
    dirContent.forEach(async item => {
      const stats = await stat(path.join(folderPath, item));
      if(stats.isFile() && item.endsWith('.css')) {
        await rm(fileStylesPath, {
          recursive: true,
          force: true
        });
        const filePath = path.resolve(__dirname, 'styles', item);
        const readStyleFile = await readFile(filePath, { encoding: 'utf8' });
        const writeInFile = await writeFile(fileStylesPath, readStyleFile, { flag: 'a' });

      }
    })
  } catch (err) {
    console.error(err);
  }
};

await list();
