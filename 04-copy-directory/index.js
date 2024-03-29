import { rm, mkdir, readdir, copyFile, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, 'files');
const folderCopyPath = path.resolve(__dirname, 'files_copy');

const copy = async () => {
  try {
    const files = await readdir(folderPath);

    await rm(folderCopyPath, {
      recursive: true,
      force: true
    });
    await mkdir(folderCopyPath, {
      recursive: false,
    });

    for (const file of files) {
      const filePath = path.resolve(__dirname, 'files', file);
      const fileCopyPath = path.resolve(__dirname, 'files_copy', file);
      await copyFile(filePath, fileCopyPath, constants.COPYFILE_FICLONE);
    }
  } catch (err) {
    console.error(err);
  }
};

await copy();
