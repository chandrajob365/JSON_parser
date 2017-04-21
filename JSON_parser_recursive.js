const fs = require('fs')
const example = fs.readFileSync("./example.json").toString()
var numRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)([e][+-]?\d+)?/

var nullParser = function(input){
  input = spaceParser(input)
  return input.slice(0,4)=='null' ? [null ,input.slice(4)] : null
}

var booleanParser = function(input){
  input = spaceParser(input)
  var match = /(^true|^false)/.exec(input)
  return match!=null ?  [match[0],input.slice(match[0].length)] : null
}

var commaParser = function(input){
  input = spaceParser(input)
  return input[0]==',' ? [',' , input.slice(1)] : null
}

var spaceParser = function(input){
    return input.match(/\s*/) ? input.replace(/\s*/ , '') : input
}

var stringParser = function(input){
  input = spaceParser(input)
  if(input[0]=='"'){
    input = input.slice(1)
    var end_index = input.indexOf('"')
    if(input.indexOf('\\')>0 && input.indexOf('\\')<end_index)
      input = input.replace('\\' , '')
    return [input.slice(0,end_index) , input.slice(end_index+1, input.length)]
  }
  return null
}

/* Array Validity Checker */
var chkValidArray = function(res){
  var input = spaceParser(res[1])
  var hasComma = commaParser(input)
  if(input==='') return false  // to check for input of type [12 , 13 , or [12 , 13
  if(hasComma){
    if(!parser(spaceParser(hasComma[1]))) return false  // to check for input of type [12 , 14 , ]
  }
  if(res[0]!==',' && !hasComma && input[0]!==']') return false // to check for input of type [12 , 13 14]
  else return true
}

/* Helper function for arrayParser */
var helperArrayParser = function(input,outArr){
  if(input.length>0 && input[0]!=']'){
    var res = parser(spaceParser(input))
    if(res===null) return null
    if (res[0] != ",") outArr.push(res[0])
    input = spaceParser(res[1])
    if(!chkValidArray(res)) return null;
    return helperArrayParser(input,outArr)
    }
    return [spaceParser(input) , outArr]
}


var arrayParser = function(input){
  input = spaceParser(input)
  if(input[0]=='['){
    input = spaceParser(input.slice(1))
    if(commaParser(input)) return null   // checking validity for [,]
    var outArr = []
    var res = helperArrayParser(input,outArr)
    if(res===null) return null
    else [input,outArr] = res
    return [outArr , input.slice(1)]
  }
  return null
}


var numberParser = function(input){
  input = spaceParser(input)
  var res
  if(res = numRegex.exec(input)){
    res_len = res.index+res[0].length
    var num = parseFloat(res[0])
    return [num , input.slice(res_len)]
  }
  return null
}

var keyParser = function(input){
  return stringParser(spaceParser(input))
}

var valueParser = function(input){
  return parser(spaceParser(input))
}

var colonParser = function(input){
  return input[0] == ':' ? [":",input.slice(1)] : null
}

var chkValidObject = function(input){
  if(input[0]==','){
    input = input.slice(1)
    if(keyParser(input)==null) return null   // to check Validity of {"k1" : 23 , }
  }else if(input[0]!==','){
    if(keyParser(input)!==null && input[0]!=='}') return null // to check Validity of {"k1":23 "K2"}
  }
  return input;
}

/* Helper function for objectParser */
var helperObjectParser = function(input,outArrObj){
  if(input.length>0 && input[0]!='}'){
    var key = keyParser(input)
    if(key==null) return null
    input = colonParser(spaceParser(key[1]))
    if(!input) return null
    value = valueParser(spaceParser(input[1]))
    if(value==null) return null
    input = spaceParser(value[1])
    outArrObj[key[0]] = value[0]
    input = chkValidObject(input)
    if(!input) return null
    return helperObjectParser(input,outArrObj)
    }
    return [input, outArrObj]
}

var objectParser = function(input){
  input = spaceParser(input)
  var outArrObj={}
  if(input[0]=='{'){
    input = spaceParser(input.slice(1))
    var res = helperObjectParser(input,outArrObj)
    if(!res) return null
    else [input,outArrObj] = res
    if(input[0]!='}') return null    // checking validity for {
    if(outArrObj!=undefined) return [outArrObj , input.slice(1)]
  }
  return null
}

function parser(input){
  var res
if(res=nullParser(input))
  return res
if(res = booleanParser(input))
  return res
if(res = stringParser(input))
  return res
if(res= arrayParser(input))
  return res
if(res = commaParser(input))
  return res
if(res = numberParser(input))
   return res
if(res = objectParser(input))
   return res
if(input !== '')
  return null
}

var parsedOutput = parser(example)
 parsedOutput!= null ? (spaceParser(parsedOutput[1])=='' ? console.log(JSON.stringify(parsedOutput[0], null, 2)) : console.log("Invalid JSON")): console.log("Invalid JSON")
