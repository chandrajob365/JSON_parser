/*this is google <a href = "http://www.go[o]gle.com"> "google"</a> and
this is itp <a href = "http://www.itp.com"> "itp"</a> and also
<a href = "http://www.freeCodeCamp.com"> "freeCodeCamp"</a>
//  regEx = \[.*?\] ---> putting ? after * (greedy quantifiers) makes it to match minimum number of characters before getting closing bracket

This is is some text text with double double  words some some where I I I am not sure why I am typing typing ? rainbow rainbow , unicorn unicorn.*/

function test_exec(){
  var str = "this is a list of phone numbers -- 123-4356 ,and  231-7654 ,and  987-1233";
  console.log(str.length);
  var reg = /(\d{3})-\d{4}/g
  var res ;
  while(res = reg.exec(str)){
    console.log(res);
  }
}

test_exec();


{"apiVersion":"2.0",
 "data":{
    "updated":"2010-01-07T19:58:42.949Z",
    "totalItems":800,
    "startIndex":1,
    "itemsPerPage":1}}

    {"name" : "manish" , "age" : 24 ,
      "items" : [true , false , 24 , "apple" ],
    "keysets" : [{"school" : "DAV",
                "city": "daltonganj"},
                {"school" : "GGPS",
                  "city" : "Ranchi"}
                  ]
                }



                {"busines" : "private_schools" , "city" : 2 ,
                  "items" : [true , false , 24 , "apple" ],
                  "schools" : [
                    {"school" : "DAV",
                      "city": "daltonganj"},
                    {"school" : "GGPS",
                      "city" : "Ranchi"}
                    ],
                    "total_turnOver" : 12.34e+6,
                    "profit" : 5.3e+6
                  }
