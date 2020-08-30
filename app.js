let express = require("express");
let bodyParser=require("body-parser");

let app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index",{main:"./sounds/songbirds.mp3" , background:"./sounds/rain.mp3"});
})

app.listen(3000,()=>{
    console.log("server started");
});
