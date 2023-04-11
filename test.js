const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
//const path = require("path");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const options = {
        url : "https://us21.api.mailchimp.com/3.0/lists/cffb6e48ac",
        method :"POST",
        headers:{
            Authorization:'auth 2763203a3937ac21a1b692bc8117bcd4-us21'
        },
        body: jsonData
    }

    request(options,(error,response,body)=>{
        console.log(error);
        //console.log(JSON.parse(body));
    })
    
    

    
})


app.listen(3000,function(){
    console.log("Server runs in port 3000");
})


//2763203a3937ac21a1b692bc8117bcd4-us21