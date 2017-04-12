var obj = '{"name":"manish" , "surname":"chandra"}';

console.log(obj[0] , obj[obj.length-1]);
//console.log(JSON.stringify(obj).length);
//console.log(JSON.parse(obj);
//op--> { name : 'manish'}
//var arr = [10 , 20 , 30];
//console.log(arr.toString());
//console.log(JSON.parse(arr.toString()));

var reg = /{\"[a-z]*\":\"[a-z]*\"}/;
console.log(reg.test(obj));

function isValidString(str){
  if(obj[0]=='{' && obj[obj.length-1] == '}'){
    return true;
  }
}


function extractValidString(str){
  if(isValidString(str)){
    console.log('is a valid string');
    return obj.slice(1,str.length-1);
  }
}

var new_str = extractValidString(obj);
console.log(new_str);

function parseString(str){
  var new_str = extractValidString(obj);
  var token = new_str.split(",");
  console.log("token : ==== " , token);
  parseKey(new_str);
  parseValue(new_str);
}

function parseKey(str){
  //var pattern =
}

function parseValue(str){

}

parseString(obj);
