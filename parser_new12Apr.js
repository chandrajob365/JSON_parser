const fs = require('fs');
const example = fs.readFileSync("./example.json").toString();
console.log("INPUT --- > " ,example);
var nullParser = function(str){
  str = spaceParser(str);
  return str.slice(0,4)=='null' ? [null ,str.slice(4)] : null;
}

var booleanParser = function(str){
  str = spaceParser(str);
  return str.slice(0,4)=='true' ? [true , str.slice(4)] :
                          (str.slice(0,5) == 'false' ?
                                                    [false ,str.slice(5)] :
                                                    null);
}

var commaParser = function(str){
  str = spaceParser(str);
  if(str.slice(0,1)== ','){
    return str.slice(1);
  }
  return str ;
}

var spaceParser = function(str){
  if(str.match(/s/)){
    return str.replace(/\s/ , '');
  }
    return str;
}

var stringParser = function(str){
  str = spaceParser(str);
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
  str = spaceParser(str);
  if(str[0]=='['){
    str = str.slice(1);
    var temp = [];
    while(str[0]!=']'){
      str = spaceParser(str);
      if (str[0] == ",") {
				str = str.slice(1);
			}
      var res = parser(str);
      temp.push(res[0]);
      str = res[1];
    }
    return temp;
  }
  return null;
}

function parser(str){
  var res;
 if(res=nullParser(str)){
    return res[1] == '' ? res[0] : res;
 }else if(res = booleanParser(str.trim())){
   return res[1] == '' ? res[0] : res;
 }else if(res= arrayParser(str.trim())){
   return res;
 }else if(res = stringParser(str.trim())){
   return res[1] == '' ? res[0] : res ;
 }else if(res = commaParser(str)){
   return res;
 }else{
   return "String cann't be parsed....";
 }
}
console.log(parser(example));
//console.log(parser("[null , false , \'a\']"));
