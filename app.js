const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req,res){
    const unit= "metric";
    const appid= "82fe8a4036c71bdff8e22c7fcec333cd";
    const cityName= req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units="+ unit +"&appid="+ appid+"";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const temp = weatherData.main.temp;
            const condition = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image= "https://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write("<h1>The current condition of weather in "+ cityName +" is: " + condition + "</h1>");
            res.write("<h1>The temperature in Delhi is: " + temp + " degree celcius</h1>");
            res.write("<img src="+image+">")
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server is started at port 3000");
})