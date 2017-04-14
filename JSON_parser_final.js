const fs = require('fs');
const example = fs.readFileSync("./example.json").toString();

var numRegex = /^[-+]?[0-9]*\.?[0-9]+[eE]?[-+]?[0-9]+/;
var nullParser = function(str){
  //str = spaceParser(str);
  return str.slice(0,4)=='null' ? [null ,str.slice(4)] : null;
}

var booleanParser = function(str){
  //str = spaceParser(str);
  return str.slice(0,4)=='true' ? [true , str.slice(4)] :
                          (str.slice(0,5) == 'false' ?
                                                    [false ,str.slice(5)] :
                                                    null);
}

var commaParser = function(str){
  //str = spaceParser(str);
  if(str[0]== ','){
    return [',' , str.slice(1)];
  }
  return null ;
}

var spaceParser = function(str){
  if(str.match(/\s/g)){
    return str.replace(/\s/ , '');
  }
    return null;
}

var stringParser = function(str){
  if(str[0]=='"'){
    str = str.slice(1);
    var end_index = str.indexOf('"');
    if(str.indexOf('\\')>0 && str.indexOf('\\')<end_index){
      str = str.replace('\\' , '');
    }
    return [str.slice(0,end_index) , str.slice(end_index+1, str.length)];
  }
  return null;
}

var arrayParser = function(str){
  if(str[0]=='['){
    str = str.slice(1);
    var temp = [];
    while(str[0]!=']'){
      var res = parser(str);
      if (res[0] != ",") {
				temp.push(res[0]);
			}
      str = res[1];
    }
    return [temp , str.slice(1)];
  }
  return null;
}

var numberParser = function(str){
  var res;
  if(res = numRegex.exec(str)){
    res_len = res.index+res[0].length;
    var num = parseFloat(res[0]);
    return [num , str.slice(res_len)];
  }
  return null;
}

var objectParser = function(str){
  var outArrObj = {};
  if(str[0]=='{'){
    str = str.slice(1);
    while(str[0]!='}'){
      var key = stringParser(str);
      if(str[0]==':'){
        str = str.slice(1);
      }
      value = parser(str);
      outArrObj[key[0]] = value[0];
      if(str[0]==','){
        str = str.slice(1);
      }
    }
    return [outArrObj , str.slice(1)];
  }
  return null;
}

function parser(str){
  var res;
  if(res=spaceParser(str)){
     return res[1] == '' ? res[0] : res;
  }else if(res=nullParser(str)){
    return res[1] == '' ? res[0] : res;
 }else if(res = booleanParser(str.trim())){
   return res[1] == '' ? res[0] : res;
 }else if(res = stringParser(str.trim())){
   return res[1] == '' ? res[0] : res ;
 }else if(res= arrayParser(str.trim())){
   return res[1] == '' ? res[0] : res;
 }else if(res = commaParser(str)){
   return res[1] == '' ? res[0] : res;
 }else if(res = numberParser(str)){
   return res[1] == '' ? res[0] : res ;
 }else if(res = objectParser(str)){
   return res[1] == '' ? res[0] : res ;
 }else{
   return "Unexpected Token : " + str;
 }
}


console.log(parser(example));
