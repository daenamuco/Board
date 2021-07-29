//익스프레스와 짭DB를 가져옴
const express = require('express');
const postList = require('../app.js');

//라우터 사용을 위한 변수
const router = express.Router();

//주식 API 불러오기
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c4161tqad3ies3kss38g"; //API_KEY 부분
const finnhubClient = new finnhub.DefaultApi();

// '/' 주소에 GET 메서드를 보낼 때 작동하는 코드
router.get('/', (req, res) => {
    //짭DB를 list 변수에 담아 index.pug 랜더링
    res.locals.list = postList;
    res.render('index');

    //주식 데이터 변수에 담기
    finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
        console.log(data);
    });

    res.locals.stock = data;
});

//라우터를 모듈로 만듬
module.exports = router;