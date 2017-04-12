const fs = require('fs');
const example = fs.readFileSync("./example.json").toString();
console.log(example);
//console.log(JSON.stringify(example));
var nullParser = function(str){
  console.log("Entry to null parser--> " , str);
  return str.slice(0,4)=='null' ? [null ,str.slice(4)] : null;
}

var booleanParser = function(str){
  console.log("Entry to booleanParser --> " , str);
  return str.slice(0,4)=='true' ? [true , str.slice(4)] :
                          (str.slice(0,5) == 'false' ?
                                                    [false ,str.slice(5)] :
                                                    null);
}

var commaParser = function(str){
  console.log("Entry to commaParser --> " , str);
  return str.slice(0,1)== ',' ? [',' , str.slice(1)] : null;
}

var arrayParser = function(str){
  console.log("Entry to arrayParser --> " , str);
  var temp = [];
  if(str[0]=='['){
    str = str.slice(1).trim();
    console.log('after removing [ --> ' , str)
    while(str[0]!=']'){

      console.log("str to be parsed from arrayparser --> " , str);
      str = parser(str);
      console.log("str returned back to arrayParser after parsing ---> " , str);
      //console.log("after parser(str) --> " , str);
      temp.push(str[0]);
      console.log("result from parser --> " , str);
      if(str[1]!== undefined){
        str = str[1].trim();
      }else{
        return "Invalid string - Cann't be parsed";
      }

    }
    return temp;
  }
  return null;
}

var stringParser = function(str){
  console.log("Entry to stringParser --> " , str);
//console.log(str[0]);
  if(str[0]=='"'){
    //console.log('hi');
    str = str.slice(1);
    index_end = str.indexOf('"');
    if(str.indexOf('\\')!=-1 && str.indexOf('\\')<index_end){
      str1 = str.slice(0 , str.indexOf('\\')) + str.slice(str.indexOf('\\')+1 , index_end);
    }else{
      str1 = str.slice(0 , index_end);
    }
    return [str1 , str.slice(index_end)];
  }
  return null;
}
//console.log(stringParser("\'ab\'"));
function parser(str){
  console.log("Parser Entry ---> " , str);
  var res;
if(res=nullParser(str.trim())){
  console.log("nullParser res not null " , res);
    return res[1] == '' ? res[0] : res;
 }else if(res = booleanParser(str.trim())){
   console.log("booleanParser res not null " , res);
   return res[1] == '' ? res[0] : res;
 }else if(res = commaParser(str.trim())){
   console.log("commaParser res not null " , res);
   return res[1] == '' ? res[0] : res;
 }else if(res= arrayParser(str.trim())){
   console.log("arrayParser res not null " , res);
   return res;
 }else if(res = stringParser(str.trim())){
   console.log("stringParser res not null " , res);
   return res[1] == '' ? res[0] : res ;
 }else{
   return "String cann't be parsed....";
 }
}
console.log(parser(example));
//console.log(parser("[null , false , \'a\']"));
