const express = require('express');
const postList = require('../app.js');

const router = express.Router();

//글의 번호를 매기는 변수
//id값과 postNumber가 같음
let postNumber = 0;

// /post 주소에 GET요청이 들어왔을 떄 실행
router.get('/', (req, res) => {
    // /routes/post.html 파일을 보내줌
    res.sendFile(__dirname + '/post.html');
});

// /post/id 주소에 GET요청이 들어왔을 때 실행
router.get('/:id', (req, res) => {
    //post객체에 해당하는 id값의 글(제목, 본문)을 넣음
    res.locals.post = postList[req.params.id];
    //postContent.pug 랜더링
    res.render('postContent');
});

// /post 주소에 POST 요청이 들어왔을 때 실행
router.post('/', (req, res) => {
    //짭DB에 글의 제목과 내용을 추가
    postList[postNumber++] = {
        title: req.body.title,
        content: req.body.content,
    };
    // '/' 주소로 리다이렉션 -> / 주소에 GET 요청
    res.redirect('/');
});

//DELETE 기능 미구현
// router.delete('/:id', (req, res) => {
//     res.send(';asd');
// })

//라우터를 모듈로 만듬
module.exports = router;