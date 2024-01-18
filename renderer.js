/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

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

var _debug = true
/**
 * @type {JSDocLive~electron_param}
 */
var extparam = JSON.parse(process.argv.at(-1)); 
console.dir(extparam);
extparam.update_jsdoclive_config = (new Function("", "return " + extparam.update_jsdoclive_config))();/**@type {Function} */

/**Объект содержит информацию о файле настроек */
var jsdoclive_obj = {
	name: 'jsdoclive.json',
	change: false,
	test(path){
		if (path.includes(this.name)) {this.change = true};
	} ,
	reset(){this.change = false},
	isChange(){return this.change}
	
}
/**Параметры  для iframe элемента. iframe элемент будет отображать содержимое сгенерированное пакетом jsdoc  */
let path = require('path');
let joinpath = path.join;
//-----Дефолтный путь---

/**
 * @class haribol108
 * 
 */

/**
 * @function haribol108#ll
 * @param {Number} h 
 * @description простая демонстрация --------------
 */
function ll(h){}

/**
 * @typedef JSDocLive~frameObj
 * данные для iframe
 * @property {String} [path=@see {extparam.callpath}] - путь до папаки
 * @property {String} [file='index.html'] - файл
 * @property {String} [protocol="file"] - протокол
 * @property {String} [host=""] - хост
 * @property {String} [prefix="out"] - префикс jsdoc
 * @property {String} defaultPath - путь по умолчанию
 * @property {String} defaultURL - URL по умолчанию
 * 
 */

/**
 * @type JSDocLive~frameObj
 */
let frameObj = {
	path: extparam.callpath,
	get prefix(){
		//let jsdocparam = extparam.jsdocparam; /**@type {Array} */
		//let _fl = "out";
		//let ind = jsdocparam.indexOf("-d");
		//if (ind >= 0){_fl =  jsdocparam[ind+1]};
		return extparam.prefix;
	////////////end get prefix//////////
	},

	file: 'index.html',
	get defaultPath(){
		return joinpath(this.path, this.prefix, this.file)
	//////end get defaultPath///////
	},

	protocol: extparam.protocol,
	host: extparam.host,
	get defaultURL(){
		return `${this.protocol}://${this.host}${this.defaultPath}`
	//////end get defaultURL///////
	}
}

//-------end blockk----------


//---------Работаёт jsdoc--------
function jsdocgen(){
	let jsdocbin = extparam.electron_root + "/node_modules/.bin/jsdoc ";
	jsdocbin = extparam.jsdoclive_config.exec_cmd || jsdocbin;
	let first_args=extparam.jsdoclive_config.first_args || " ";
	let last_args=extparam.jsdoclive_config.last_args || " ";

	let jsdocstgen = `${jsdocbin} ${first_args} ${extparam.jsdocparam.join(" ")} ${last_args}`;

	
	

//---удоляем превикс------
	let _jsdocprefix = require('path').join(extparam.callpath, extparam.prefix);
	try {require('fs').rmSync(_jsdocprefix, {recursive:true})}catch(e){
		/*console.error("out err");
		console.error(e)*/
};
//---Закончили блок удаления
//	let execcmd = /*`${frameObj.prefix};` + */jsdocstgen;

/*если в папке, из которой был произведён вызов - есть файл настроек jsdoclive.json,
и в нём определено свойство 'exec_cmd' - то буден выполнена эта команда,
 а не команда jsdoc */
	let execcmd = jsdocstgen;	


	console.log(execcmd);
	let opt = {cwd: extparam.callpath};
	try {
		require('child_process').execSync(execcmd, opt);
	} catch(e){console.warn('exec erorr from renderer.js');console.warn(e)}
}
jsdocgen();
//-------end jsdoc-------------



//-------Наблюдатель файловой системы watch---------
let {watch} = require("gulp");
var _path = extparam.callpath;
console.dir(extparam.callpath);

////////


////////


//document.getElementById('gulp').innerHTML = `Watchin to ${_path}`;
let _opt = {}; 

let blacklist = [
	(new RegExp(`${frameObj.prefix}\/.{1,}`)),
	(new RegExp(`\/${frameObj.prefix}$`))
	];

_opt.ignored = blacklist;

//-----Проверка наличия файла----
function exist(ppath){
	var {accessSync, constants} = require('fs');

	try {accessSync(ppath, constants.R_OK | constants.W_OK);
		return true	}	catch(e){return false}

}
//---------end exist-----------
let {PoolCall} = require('poolcall');


//срабатывает в конце очереди
var andWatch = () =>{
	if (jsdoclive_obj.isChange()){extparam.update_jsdoclive_config.call(extparam)};
	jsdoclive_obj.reset();
	jsdocgen();
	try {
	let _cW = ifr.contentWindow;
	let _href = _cW.location.href
	//alert(_cW.location.href);
	if(exist(new URL(_href))) {
		_scroll.X = _cW.scrollX;
		_scroll.X = _cW.scrollY;
		//ifr.src="";
		//ifr.src= _href;
		_cW.location.reload();
			
	} else {
		_scroll.setDefault();
		ifr.src = frameObj.defaultURL;
	};
} catch(e){
	console.error(e)
}
	console.log('change end')};



let wait = new PoolCall(andWatch,{}, _debug); //очередь сигналов об изменениях fs


//---Начало мониторинга FS
let watcher = watch(_path, _opt);


		watcher.on('all', (ev, path)=>{
			console.log('change', path); 
			jsdoclive_obj.test(path);


			wait.start()
			//document.getElementById("ins").innerHTML += `${ev}:	${path}<br>`

		});

//-----end watch-----


//////Начало логики iframe элемента//////

var _scrollY = 0;
var _scrollX = 0;
/**
 * Объект этого типа описывает состояние прокрутки страницы
 * @typedef {Object} JSDocLive~scroll
 * @property {Number} devX - прокрутка по оси X. Значение по умолчанию.
 * @property {Number} devY - прокрутка по оси Y. Значение по умолчанию.
 * @property {Number} X - прокрутка по оси X. Значение сохраняется и перезаписывается.
 * @property {Number} Y - прокрутка по оси Y. Значение сохраняется и перезаписывается.
 * @property {Function} setDefault - Функкция устанавливает X и Y в значение по умолчанию
 */

/** 
 * @type JSDocLive~scroll
 */

var _scroll = 
	{
		devX:0,
		devY:0,
		X: this.devX,
		Y: this.devY,
		setDefault(){this.X = this.devX; this.Y = this.devY }
	};

ifr.src = frameObj.defaultURL;

//задаём скролинг
_scroll.setDefault();
ifr.onload = ()=>{
ifr.contentWindow.scrollTo(0, 0);
ifr.contentWindow.scrollTo(_scroll.X, _scroll.Y);


}


////Конец логике iframe

