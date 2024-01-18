var read_path = "./package.json";
var content_file;

try {
    content_file = require("fs").readFileSync(read_path);
    content_file = JSON.parse(content_file);
    content_file = content_file.dependencies;
    JSON.parse('{"c6: 5}');
}
catch(e){content_file = undefined}

var res = content_file ? 'yes': 'no';

console.log(res);