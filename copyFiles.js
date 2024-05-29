const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function detectOS() {
  const os = require("os");
  return os.platform();
}

function checkSrcFolderExist() {
  return fs.existsSync("./src");
}

function isJSFile(file) {
  return file.endsWith(".js");
}

// Função recursiva para listar arquivos .js
function listJSFiles(directory) {
  let jsFiles = [];

  // Lista os arquivos na pasta
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Se o caminho é um diretório, chama a função recursivamente
      jsFiles = jsFiles.concat(listJSFiles(filePath));
    } else if (isJSFile(file)) {
      // Se o caminho é um arquivo .js, adiciona à lista
      jsFiles.push(filePath);
    }
  });

  return jsFiles;
}

function copyFiles() {
  const os = detectOS();
  if (os === "win32") {
    if (checkSrcFolderExist()) {
      const jsFiles = listJSFiles("./src");
      jsFiles.forEach((file) => {
        const destDirectory = path.join(
          "./dist",
          path.relative("./src", path.dirname(file))
        );
        // Verifica se o diretório de destino existe
        if (!fs.existsSync(destDirectory)) {
          // Se não existir, cria o diretório
          fs.mkdirSync(destDirectory, { recursive: true });
        }
        // Copia o arquivo .js para a pasta de destino
        execSync(
          `copy /Y "${file}" "${path.join(destDirectory, path.basename(file))}"`
        );
      });
    } else {
      console.error("Pasta src não encontrada.");
    }
  } else {
    const jsFiles = listJSFiles("./src");
    jsFiles.forEach((file) => {
      // Remove a parte inicial do caminho (o diretório 'src') antes de copiar
      const destDirectory = path.join(
        "./dist",
        path.relative("./src", path.dirname(file))
      );
      if (!fs.existsSync(destDirectory)) {
        fs.mkdirSync(destDirectory, { recursive: true });
      }
      execSync(
        `cp "${file}"  "${path.join(destDirectory, path.basename(file))}"`
      );
    });
  }
}

copyFiles();
