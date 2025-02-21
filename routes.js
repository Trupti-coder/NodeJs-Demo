
// all crud operations 

var express=require("express");
var router=express.Router();

var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(bodyParser.raw());


let mongoose=require('mongoose');
let user=require("./modules/user");




/*mongoose.connect("mongodb://127.0.0.1:27017/test").then()
{
    try{
        console.log("database connected");
    }
    catch{

    }

}*/

const db = {};
db.user=user;
db.mongoose = mongoose;
db.url = 'mongodb://127.0.0.1:27017/test';

db.mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>{
    console.log("database connected");
})

.catch(err => {
    console.log("database not connected",err);
    process.exit();
});

const User = db.user;

router.get("/",function(req,res){
    res.send("this is hoome page");
})

//insert the record

router.post("/newUser",async function(req,res){
    
    var obj=req.body;
    console.log(obj);
    var result=await User.insertMany(obj);
    console.log(result);
    res.json(result);
})

//display all records

router.get("/users",async function(req,res){
    var result=await User.find({},{_id:0,__v:0});
    res.json(result);
})

//search  record

router.get("/getUser/:id",async function(req,res){
    var id=req.params.id;
    var result=await User.findOne({userId:id});
    if(result){
        res.json({"msg":"record found!",data:result});
    }
    else{
        res.json({"msg":"record not found"});
    }
    
})

//update record


router.put("/updateUser/:id",async function(req,res){
    var id=req.params.id;
    var newCity=req.body.userCity;

    var getId=await User.findOne({userId:id});
    if(getId){


        var result=await User.updateOne({userId:id},{userCity:newCity});

        if(result){
            let upObj=await User.findOne({userId:id},{_id:0,__v:0});
                res.json({"msg":"record updated",data:upObj});
            }
            

    }
    else{
        res.json({"msg":"record not updated"});
    }

})


//for delete

router.delete("/deleteUser/:id",async function(req,res){
    var id=req.params.id;
    var result=await User.findOneAndDelete({userId:id});


    if(result){
        res.json({"msg":"record deleted",data:{userId:result.userId}});

    }
    else{
        res.json({"msg":"record not deleted"});
    }

});

//pagination

router.get("/getRecords/:lt/:sk",async function(req,res){
    var lmt=req.params.lt;
    var skp=req.params.sk;
    var result=await User.find({},{_id:0,__v:0}).limit(lmt).skip(skp);
    res.json(result);
})


module.exports=router;