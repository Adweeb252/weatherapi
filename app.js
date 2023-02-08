const express = require("express");
const https = require("https");

const app= express();
app.get("/", function(req, res){
    res.send("Server is started");
})
const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=82fe8a4036c71bdff8e22c7fcec333cd"
https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData= JSON.parse(data);
        console.log(weatherData);
    })
})

app.listen(3000, function(){
    console.log("Server is started at port 3000");
})