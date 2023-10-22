const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("path");
const readline = require("readline/promises");

// Var
let folderPath;
let storeRenamedFilePath;
let imageNum = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const imageFormats = [
  "JPEG",
  "JPG",
  "PNG",
  "GIF",
  "BMP",
  "TIFF",
  "TIF",
  "WEBP",
  "SVG",
  "RAW",
  "ICO",
  "HEIF",
  "HEIC",
  "PSD",
  "AI",
  "EPS",
  "PDF",
  "INDD",
  "CR2",
  "NEF",
  "SR2",
  "ORF",
  "RW2",
  "DNG",
  "ARW",
  "CRW",
  "RWL",
  "3FR",
  "MOS",
  "DCR",
  "KDC",
  "PCX",
  "PICT",
  "XBM",
  "WEBP",
  "JP2",
  "JPF",
  "JPM",
  "JPX",
  "MJ2",
  "WMF",
  "EMF",
  "ICO",
  "IFF",
  "CUR",
  "BPG",
];

const extensions = [
  ...imageFormats,
  ...imageFormats.map((format) => format.toLowerCase()),
].map((el) => `.${el}`);

console.log(extensions);

function copyFile(srcFile, desFile, desPath) {
  const isDirectoryExists = fsSync.existsSync(desPath);

  if (!isDirectoryExists) {
    fsSync.mkdirSync(desPath);
  }
  fsSync.copyFileSync(srcFile, desFile);
}

async function scan(folderPath) {
  // Read the files in dir
  const files = await fs.readdir(folderPath);

  // Loop over the file names
  files.forEach(async (file, i) => {
    const filePath = folderPath + "/" + file;
    const fileStat = await fs.stat(filePath);

    // Check It is file or folder
    const isFile = fileStat.isFile();
    const fileExt = isFile && path.extname(file);

    if (isFile && extensions.includes(fileExt)) {
      copyFile(
        filePath,
        `${storeRenamedFilePath}/image-${imageNum}${fileExt}`,
        storeRenamedFilePath
      );
      imageNum = imageNum + 1;
    }

    // If it is a folder recursive
    if (!isFile) {
      scan(`${folderPath}/${file}`);
    }
  });
}

(async () => {
  console.log("Welcome To Image Renamer (It Is Recursive)");
  const folderSrc = await rl.question("Please Enter The Folder Src : ");
  const decSrc = await rl.question(
    "Enter the des to save the renamed files : "
  );
  folderPath = folderSrc;
  storeRenamedFilePath = `${decSrc}/node-Renamed-Images`;
  rl.close();
  scan(folderPath);
})();
