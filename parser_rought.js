var str = "null , true , false , [true , false]";

var nullParser = function(str){
  console.log("Inside Null parser --> " , str);
  return str.slice(0,4)=='null' ? [null ,str.slice(4)] : null;
  /*if(str.slice(0,4) == 'null'){
    var res =  [null , str.slice(4)];
    console.log("res--> " , res);
    return res;
  }else{
    return null;
  }*/
}

var booleanParser = function(str){
  console.log("booleanParser Entry ---> " , str);
  /*if(str.slice(0,4)=='true'){
    var res = [true , str.slice(5)];
    console.log("From Boolean parser with true  res = --->" , res);
    return res;
  }else if(str.slice(0,5) == 'false'){
    var res = [false , str.slice(5)];
    console.log("From Boolean parser with false  res = --->" , res);
    return res;
  }else{
    return null;
  }*/
  return str.slice(0,4)=='true' ? [true , str.slice(5)] :
                          (str.slice(0,5) == 'false' ?
                                                    [false ,str.slice(5)] :
                                                    null);
}

var commaParser = function(str){
  console.log("CommaParser Entry ---> " , str);
  /*if(str.slice(0,1)== ','){
    var res = [',' , str.slice(1)];
    console.log("From inside commaParser --> " , res);
    return res;
  }else{
    return null;
  }*/
  return str[0]== ',' ? [',' , str.slice(1)] : null;
}

var arrayParser = function(str){
  console.log("arrayParser Entry ---> " , str);
  // if(str[0]=='['){
  //   if(str.indexOf(']')!==-1){
  //     return ['[' , str.slice(1)];
  //   }else{
  //     return null;
  //   }
  // }if(str[0]==']'){
  //   return [']' , str.slice(1)];
  // }
  if(str[0]=='['){
    var token = str.split(',');
    for(var i =0 ; i<token.length ; i++){

    }
  }

}
var arr = [];
function parser(str){
  console.log("entry --- > " , str);
  var res =[];
 if(str.trim().length ==0){
   return arr;
 }else if(res=nullParser(str.trim())){
   console.log("nullParser res -- > "  , res , "  res[0] = "  , res[0]);
    arr.push(res[0]);
    return parser(res[1]);
 }else if(res = booleanParser(str.trim())){
   console.log("booleanParser res --> " , res , "  res[0] = "  , res[0]);
   arr.push(res[0]);
   return parser(res[1]);
 }else if(res = commaParser(str.trim())){
   console.log("commaParser res --> " , res, "  res[0] = "  , res[0]);
   //arr.push(res[0]);
   return parser(res[1]);
 }else if(res = arrayParser(str.trim())){
   console.log("arrayParser res --> " , res, "  res[0] = "  , res[0]);
   arr.push(res[0]);
   return parser(res[1]);
 }
}

console.log(parser(str));
console.log("arr --> " , arr);
// function commaParser(str){
//   return str.split(',');
//   //return (String.prototype.trim(null,token));
//   //return token;
// }
// //var token = commaParser(str);
//  function parse(str){
//    var arr = [];
//    var token = commaParser(str);
//    for(var elm in token){
//      var res ='';
//      console.log(token[elm].trim());
//      if(res = boolParser(token[elm].trim())){
//        arr.push(res);
//      }if(res = nullParser(token[elm].trim())){
//        arr.push(res);
//      }
//    }
//    return arr;
//  }
//
//  function boolParser(elm){
//    console.log("boolparser -- " , elm);
//    if(typeof elm === 'boolean'){
//      return elm;
//    }else{
//      return null;
//    }
//  }
//
// function nullParser(elm){
//   console.log("null parser -- > " , elm);
//   if(elm===null){
//     return elm;
//   }else{
//     return null;
//   }
// }
//
// console.log(parse(str));
