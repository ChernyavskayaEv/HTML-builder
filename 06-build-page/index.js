import { readdir, stat, readFile, writeFile, rm, mkdir, copyFile, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPathWithStyle = path.resolve(__dirname, 'styles');
const mainFolderPath = path.resolve(__dirname, 'project-dist');
const assetsPath = path.resolve(__dirname, 'assets');
const assetsCopyPath = path.resolve(__dirname, 'project-dist', 'assets');
const componentsPath = path.resolve(__dirname, 'components');
const templatePath = path.resolve(__dirname, 'template.html');


await rm(mainFolderPath, {
  recursive: true,
  force: true
});
await mkdir(mainFolderPath, { recursive: false, });

const fileStylesPath = path.resolve(__dirname, 'project-dist', 'style.css');

const writeAllStylesInFile = async () => {
  try {
    const files = await readdir(folderPathWithStyle);

    for (const file of files) {
      const stats = await stat(path.join(folderPathWithStyle, file));
      if (stats.isFile() && file.endsWith('.css')) {
        const filePath = path.resolve(__dirname, 'styles', file);
        const readStyleFile = await readFile(filePath, { encoding: 'utf8' });
       await writeFile(fileStylesPath, readStyleFile, { flag: 'a' });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const copyFolder = async (folderPath, folderCopyPath) => {
  try {
    const files = await readdir(folderPath);

    await mkdir(folderCopyPath, {
      recursive: false,
    });

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileCopyPath = path.join(folderCopyPath, file);
      const stats = await stat(filePath);
      if (stats.isFile()) {
        await copyFile(filePath, fileCopyPath, constants.COPYFILE_EXCL);
      } else {
        copyFolder(filePath, fileCopyPath)
      }
    }
  } catch (err) {
      console.error(err);
  }
};

const createIndexFile = async () => {
  try {
    const readTemplateFile = await readFile(templatePath, { encoding: 'utf8' });
    const templateData = {};
    
    const regex = /{{(?<key>\w+)}}/g;

    const files = await readdir(componentsPath);
    for (const file of files) {
      const filePath = path.join(componentsPath, file);
      const stats = await stat(filePath);
      if(stats.isFile() && file.endsWith('.html')) {
        const key = file.slice(0,-5);
        const value = await readFile(filePath, { encoding: 'utf8' });
        templateData[key] = value;
      } 
    }
    const fileIndexPath = path.resolve(__dirname, 'project-dist', 'index.html');
    await writeFile(fileIndexPath, readTemplateFile.replaceAll(regex, (match, key) => templateData[key]), { flag: 'a' });
  } catch (err) {
      console.error(err);
  }
}

await writeAllStylesInFile();
await copyFolder(assetsPath, assetsCopyPath);
await createIndexFile();
