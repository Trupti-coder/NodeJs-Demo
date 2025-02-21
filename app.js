var express=require("express");
var app=express();

var routes=require('./routes');
 app.use("/userApp",routes); 



app.listen(3000,function(){
    console.log("server listening at port 3000");
})








