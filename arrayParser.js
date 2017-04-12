var arr2 = '["apple" ,"banana" , ["lion" , "monkey"] , "grass"]';
var token = arr2.split(',');
console.log(token[0][0]);

console.log(token.map)
function parseArray(arr2){
  var tempArr=[];
  if(token[0][0]=='['){
    for(var i = 0 ; i < token.length ; i++){
      if(token[i][token[i].length-1]== ']'){
        break;
      }else{
        tempArr.push(token[i]);
      }
    }
  }
  return tempArr;
}
