const fs = require('fs')
const example = fs.readFileSync("./example.json").toString()
var numRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)([e][+-]?\d+)?/

var nullParser = function(str){
  str = spaceParser(str)
  return str.slice(0,4)=='null' ? [null ,str.slice(4)] : null
}

var booleanParser = function(str){
  str = spaceParser(str)
  return str.slice(0,4)=='true' ? [true , str.slice(4)] :
                          (str.slice(0,5) == 'false' ?
                                                    [false ,str.slice(5)] :
                                                    null)
}

var commaParser = function(str){
  str = spaceParser(str)
  return str[0]==',' ? [',' , str.slice(1)] : null
}

var spaceParser = function(str){
    return str.match(/\s*/) ? str.replace(/\s*/ , '') : str
}

var stringParser = function(str){
  str = spaceParser(str)
  if(str[0]=='"'){
    str = str.slice(1)
    var end_index = str.indexOf('"')
    if(str.indexOf('\\')>0 && str.indexOf('\\')<end_index)
      str = str.replace('\\' , '')
    return [str.slice(0,end_index) , str.slice(end_index+1, str.length)]
  }
  return null
}

var arrayParser = function(str){

  str = spaceParser(str)
  if(str[0]=='['){
    str = spaceParser(str.slice(1));

    var temp = []
    while(str.length>0 && str[0]!=']'){
      str = spaceParser(str)
      var res = parser(str)
      if(res==null) return null;
      if (res[0] != ",") temp.push(res[0])
      str = res[1]
      str = spaceParser(res[1])
      var test;
      if(test=commaParser(str)){
        if(!parser(test[1])) return null
      }
      if(str=='') return null;
    }
    return [temp , str.slice(1)]
  }
  return null
}


var numberParser = function(str){
  str = spaceParser(str)
  var res
  if(res = numRegex.exec(str)){
    res_len = res.index+res[0].length
    var num = parseFloat(res[0])
    return [num , str.slice(res_len)]
  }
  return null
}

var keyParser = function(str){
  return stringParser(spaceParser(str))
}

var valueParser = function(str){
  return parser(spaceParser(str))
}

var colonParser = function(str){
  return str[0] == ':' ? str.slice(1) : str
}

var objectParser = function(str){
  str = spaceParser(str)
  var outArrObj={};
  if(str[0]=='{'){
    str = spaceParser(str.slice(1))
    while(str.length>0 && str[0]!='}'){
      var key = keyParser(str)
      if(key==null) return null
      str = colonParser(spaceParser(key[1]))
      value = valueParser(str)
      if(value==null) return null
      str = spaceParser(value[1])
      outArrObj[key[0]] = value[0]
      if(str[0]==','){
        str = str.slice(1)
        if(keyParser(str)==null) return null;
      }
    }
    if(outArrObj!=undefined)
      return [outArrObj , str.slice(1)]
  }
  return null
}

function parser(str){
  var res
if(res=nullParser(str))
  return res
if(res = booleanParser(str.trim()))
  return res
if(res = stringParser(str.trim()))
  return res
if(res= arrayParser(str.trim()))
  return res
if(res = commaParser(str))
  return res
if(res = numberParser(str))
   return res
if(res = objectParser(str))
   return res
if(str !== '')
  return null;
}

var parsedOutput = parser(example);
 parsedOutput!= null ? (spaceParser(parsedOutput[1])=='' ? console.log(parsedOutput[0]) : console.log("Invalid JSON")): console.log("Invalid JSON");
