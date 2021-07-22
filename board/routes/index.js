//익스프레스와 짭DB를 가져옴
const express = require('express');
const postList = require('../app.js');

//라우터 사용을 위한 변수
const router = express.Router();

// '/' 주소에 GET 메서드를 보낼 때 작동하는 코드
router.get('/', (req, res) => {
    //짭DB를 list 변수에 담아 index.pug 랜더링
    res.locals.list = postList;
    res.render('index');
});

//라우터를 모듈로 만듬
module.exports = router;