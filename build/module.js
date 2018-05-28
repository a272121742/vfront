const fs = require('fs');
const child_process = require('child_process');
const scriptPath = __dirname;
const templatePath = `${scriptPath}/template`
const basePath = process.cwd();
const moduleName = process.argv[2];
const moduleFullPath = `${basePath}/src/modules/${moduleName}`;



const existsModule = function(modulePath){
  return new Promise((reslove, reject) => {
    let exits = fs.existsSync(modulePath);
    (exits ? reject() : reslove());
  });
};



const copyFiles = function(from, to){
  child_process.spawn('cp', ['-r', from, to]);
};

(async function createModule(){
  try {
    await existsModule(moduleFullPath).then(() => {
      copyFiles(templatePath, moduleFullPath);
    }).catch(() => {
      throw new Error('文件夹已经存在: ' + moduleFullPath);
    });
    console.log('模块文件夹创建成功: ' + moduleFullPath);
  } catch (err) {
    console.error(err.message);
  }
})();
