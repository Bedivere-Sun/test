//通过数组排序实现对cityList的JSON数据的排序……

const readFile = require('util').promisify(require('fs').readFile);
const path = require('path');

//获取文件名和路径
const FILE_NAME = path.join(__dirname, './cityList.json');

//首先读取文件，序列化为文本，转换为JSON数据……也许有更好的办法吧……？……
//具体的排序怎么回事我弄得太啰嗦了，所以写在README了……
readFile(FILE_NAME).then(res=>{
    res = JSON.parse(res.toString());
    res.sort(function cmpFn(a, b){
        return a.name.localeCompare(b.name);
    });
    console.log(res);

/*
    let cityNames = ['佛山','佳木斯','依兰','保定','宝山'];
    for(let cityName of cityNames){
        console.log(cityName, ':', cityName.charCodeAt());
    }
*/  
});
