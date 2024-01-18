// Modules to control application life and create native browser window

console.log('massage from electron');
console.dir(process.argv[2]);
const { app, BrowserWindow } = require('electron');
const path = require('path')  ;

/**
 * Внешние данные с которыми вызывается оболочка electron пакета jsdoclive
 * @typedef {Object} JSDocLive~extparam
 * используются дальше в приложение
 * @property {String} callpath - папка из которой был сделан вызов jsdoclive. Этаже папка будет рабочим катологом для jsdoc
 * @property {Array} jsdocparam - массив параметров для jsdoc. Задаётся из коммандной строки 
 * 
 * служебные параметры
 * @property {String} electron_bin - путь до бинарного файла electron
 * @property {Array} electron_param - Массив парметров с котороыми была вызвана оболочка electron
 * @property {String} electron_root - Рабочий католого для оболочки electron
 * @property {String} exec_cmd - выполняема команда 
 * jsdoclive_config
 * @property {String} [jsdoclive_config.exec_cmd] - выполняема команда 
 * @property {String} [jsdoclive_config.output_res] - папка с результатом работы команды
 * @property {String} [jsdoclive_config.first_args] - которые будут добавлены в начало списка параметров  выполняемой команде 
 * @property {String} [jsdoclive_config.last_args] - которые будут добавлены в конец списка параметров  выполняемой команде
 * @property {Boolean}[jsdoclive_config.delete_to_end=true] - если false - то пака, откуда jsdoclive берёт данные для отображения, будет оставлена после закрытия приложения.
 * @property {String} update_jsdoclive_config - Текст объявления функции 
 * которая обновляет настройки из файла jsdoclive.json. Переводить в обычную функцию следующим образом
 * <code>update_jsdoclive_config = (new Function("", "return " + update_jsdoclive_config))()
 * Дальше её потребно вызвать в контексте объекта содержащий данные переданные из файла JSDocLive
 */

debugger;
let extparamst = process.argv[2]; /**JSON строка параметров с которыми была запущена оболочка electron */

/**
 * @type {JSDocLive~extparam}
 */
let extparam = JSON.parse(extparamst); /** десериализация JSON строки */

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      sandbox: false,
      contextIsolation:false,
      additionalArguments: [extparamst],
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  /*mainWindow.webContents.on('did-finish-load', ()=>{
    mainWindow.webContents.send('say', process.argv);
    //mainWindow.webContents.executeJavaScript('alert(55)');
    
    });*/

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
var und = undefined;
app.on('window-all-closed', function () {
//при закрытие приложения удаляет папку которая была создана пакетом jsdoc 
 

  let jsdocprefix = require('path').join(extparam.callpath, extparam.prefix);

  let delflag = extparam.jsdoclive_config.delete_to_end;

  if(delflag){ //если false - то удаления не будет
		try {require('fs').rmSync(jsdocprefix, {recursive:true})}catch(e){
				/*console.error("out err");
				console.error(e)*/
		};
 
  }
  //////////////////////////////////////////////////////////////
  if (process.platform !== 'darwin') {console.log('app.quit()');app.quit();/* app.exit()*/;console.log('oops')}
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
