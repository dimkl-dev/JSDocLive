 # JSDocLive #
Визуальный  Front end для **jsdoc**. Позволяет использовать jsdoc в режиме 
<a href="#LiveEdit">LiveEdit</a> Автоматически, при сохрание исходных кодов, обновляе  визуальное представление документации генерируемой jsdoc. Если раздел документации после обновления существует - то страница обновится с сохранием позиции прокрутки. Если страницы нет - перейдёт на главную страницу. При закрытия окна просмотра - папка с докуметацией сама удалится(это поведение можно переопределить в файле <a href="#jsdoclive.json">jsdoclive.json</a>).

 ## Install ##
Так пакет **JSDocLive** является пакетом nodejs - то вам для установки понадобится менеджер пакетов, к примеру **npm**.<br>

Для установки пакета в качестве зависимомти другого пакета.

    npm install jsdoclive

Что бы скачать git репозиторий пакета - вам так же понадобится   **git**. Выполните в терминалн следующий код 

    git clone https://github.com/dimkl-dev/JSDocLive.git && cd ./JSDocLive && npm install

 ## Usage ##
 Используется так же как **jsdoc**. Принимает из командной строки те же 
 самые параметры что и **jsdoc**.<br>**Пример**: Генерация документации для текущей папки:
    
    jsdoclive ./

## <span id="LiveEdit">Режим LiveEdit</span>
Режим **LiveEdit**(режим живого просмотра), работает только web содержимым(html, css и js файлы). Представляет собой по сути веб браузер. Входной точкой для просмотра является файл ***index.html***. Режим организован очень экономично для ресурсов системы. Могут генироватся множества изменений исходных кодов, jsdoclive подождёт пока все изменения произойдут, и запустит обработку jsdoc после завершения и сохранения всех изменений(примерно через секунду). 
Такая возможность реализованы благодаря пакету [poolcall](https://www.npmjs.com/package/poolcall). Для отображения web  контента используется пакет **electron**. Выбор в его пользу был сделан потуму что он одинаково хорошо работает как при локальном доступе, так и при удалённом(к примеру через протокол VNC). Также легко выдерживает одновременный запуск нескольких экземпляров

## Переопределение генерируемой докуметации(или дополнительные параметры) ##
По умолчанию для генерации документации используется пакет jsdoc3. При необходимости комманду для гененрации можно переопределить через файл конфигурации **jsdoclive.json**, который должен распологатся там же, где и происходит вызов **jsdoclive**. Наличие этого файла **jsdoclive.json** дополняет параметры коммндной строки, и превращает **jsdoclive** в инструмент интерактивного просмотра web докуметов

## <span id='jsdoclive.json'>Структура файла ***jsdoclive.json***</span> ##
**jsdoclive.json** предстовляет собой **json** объект со следующей структурой <br>
<code>
<pre>
{
    "exec_cmd",
    "first_args",
    "last_args",    
    "output_res",    
    "delete_to_end"
}
</pre>
</code>
где:<br>

* **"exec_cmd"** (Type: **String**) - (по умолчанию jsdoc) параметр содержащий строку с коммандой, которая будет выполнена относительно текущей директории (заставляет использовать указанную команду вместо пакета jsdoc)

* **"first_args"** (Type: **String**) - строка содержит параметры  которые будут добавлены в начало списка параметров  выполняемой команде. Аргументы коммандной строки будут добавлены после этого параметра.

* **"last_args"** (Type: **String**) - строка содержит параметры  которые будут добавлены в конец списка параметров  выполняемой команде. Аргументы коммандной строки будут добавлены перед этим параметром. 

* **output_res** (Type: **String**) - (по умолчанию 'out') параметр содержащий путь папки, куда будет выведен результат работы команды.<br>
<u>**ПРИМЕЧАНИЕ:**</u> - если команда для генерации папки документации определена в одном из параметров: 
    - **"exec_cmd"**,
    - **"first_args"**
    - **"last_args"**
    
    <span style="margin-top: -12px; display: block;">
    
    то указание пути к папки в параметре **output_res** - обезательно.
    
    </span>

* **"delete_to_end"** (Type: **Boolean**) - логический параметр. если false - то пака, откуда jsdoclive берёт данные для отображения, будет оставлена после закрытия приложения. По умолчанию true.


Аргументы командной строки(те с которами запускался jsdoclive)  добовляются в любом случае. Если указаны все поля в файле **jsdoclive.json** то выполняемая команда, для генерации, будет компоноватся следующим образом:
<br>

**exec_cmd** **first_args** аругменты jsdoclive **last_args** 


## ВАЖНО
Не помещайте в папку, котора генерируется пакетом jsdoclive, другие файлы. При измение исходных файлов - папка с генерируемыми документами полностью очищается, и документация генерируется вновь
