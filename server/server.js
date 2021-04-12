const express = require('express')
const svgCaptcha = require('svg-captcha');
var svgToMiniDataURI = require('mini-svg-data-uri');

 
const app = express()

app.get('/', function (req, res) {
    var captcha = svgCaptcha.create();
    const datauri = svgToMiniDataURI(captcha.data);

    res.json( {
        text : captcha.text, 
        svg : captcha.data, 
        uri : datauri
    })
});

app.listen(4000, () => {
    console.log("running on port 4000")
})