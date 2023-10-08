//some client
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.set('port', 3030);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//axios 요청
app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/staticfile/rest_api_client.html");
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 실행 중...');
});