const fs = require('fs');
const example = fs.readFileSync("./example.json").toString();
console.log(example);
var nullParser = function(str){
  str = spaceParser(str);
  console.log("Entry nullParser after spaceParser  : " , str);
  return str.slice(0,4)=='null' ? [null ,str.slice(4)] : null;
}

var booleanParser = function(str){
  str = spaceParser(str);
  console.log("Entry booleanParser after spaceParser  : " , str);
  return str.slice(0,4)=='true' ? [true , str.slice(4)] :
                          (str.slice(0,5) == 'false' ?
                                                    [false ,str.slice(5)] :
                                                    null);
}

var commaParser = function(str){
  str = spaceParser(str);
  console.log("Entry commaParser after spaceParser  : " , str);
  if(str.slice(0,1)== ','){
    return [',' , str.slice(1)];
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
  console.log("Entry Stringparser : " , str , "  str[0] : " , str[0]);
  str = spaceParser(str);

  if(str[0]=='"'){
    str = str.slice(1);
    console.log("After str.slice(1) :  " , str);
    var end_index = str.indexOf('"');
    if(str.indexOf('\\')>0 && str.indexOf('\\')<end_index){
      str = str.replace('\\' , '');
    }
    return [str.slice(0,end_index) , str.slice(end_index+1, str.length)];
  }
  return null;
}

var arrayParser = function(str){
  //var ouputArr =[];
  str = spaceParser(str);
  console.log("Entry arrayParser after spaceParser : " ,str);
  if(str[0]=='['){
    str = str.slice(1);
    var temp = [];
    while(str[0]!=']'){
      console.log("str after while entry : " ,str);
      str = spaceParser(str);
      var res = parser(str);
      if (res[0] != ",") {
				temp.push(res[0]);
			}
      console.log("temp --->  " , temp);
      str = res[1];
      str = spaceParser(res[1]);
    }
    return [temp , str.slice(1)];
  }
  return null;
}

//console.log(stringParser("\'ab\'"));
function parser(str){
  console.log("Parser Entry ---> " , str);
  var res;
 if(res=nullParser(str)){
   console.log("res from nullParser : "  , res);
    return res[1] == '' ? res[0] : res;
 }else if(res = booleanParser(str.trim())){
   console.log("res from booleanParser : "  , res);
   return res[1] == '' ? res[0] : res;
 }else if(res = stringParser(str.trim())){
   console.log("res from stringParser : " , res);
   return res[1] == '' ? res[0] : res ;
 }else if(res= arrayParser(str.trim())){
   console.log("res from arrayParser : "  , res);
   return res[1] == '' ? res[0] : res;
 }else if(res = commaParser(str)){
   console.log("res from commaParser : "  , res);
   return res[1] == '' ? res[0] : res;
 }else{
   return "Unexpected Token : " + str;
 }
}


console.log(parser(example));
//console.log(parser("[null , false , \'a\']"));
