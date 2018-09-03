"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
function foreachdir(path) {
    let fslist = [];
    if (fs.lstatSync(path).isDirectory()) {
        let dirfiles = fs.readdirSync(path);
        for (let i = 0; i < dirfiles.length; i++) {
            let p = path_1.join(path, dirfiles[i]);
            if ((fs.lstatSync(p)).isDirectory()) {
                fslist.push(...foreachdir(p));
            }
            else {
                fslist.push(p);
            }
        }
    }
    else {
        fslist.push(path);
    }
    return fslist;
}
let files = foreachdir('D:\\Program\\Project\\ChuFang\\Wechat\\src');
let writeStream = fs.createWriteStream('result.txt');
files.forEach(file => {
    if ('.js,.ts,.html,.vue'.split(',').indexOf(path_1.extname(file)) > -1) {
        writeStream.write(file + "\r\n");
        writeStream.write(fs.readFileSync(file));
    }
});
//# sourceMappingURL=index.js.map