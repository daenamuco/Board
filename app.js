//npm start 입력시 시작하는 메인 파일
//각종 라이브러리 불러오기
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

//짭 데이터베이스 만들어서 모듈로 만듬
const postList = [];
module.exports = postList;

//환경변수 관련 코드, 지금은 사용하지 않는 코드임
dotenv.config();

//익스프레스를 사용
const app = express();

//각각의 라우터를 가져옴 
const indexRouter = require('./routes');
const postRouter = require('./routes/post');

//포트를 3000번으로 설정
app.set('port', 3000);

//퍼그를 사용하기 위한 코드
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//각종 미들웨어 설정 코드
app.use(morgan('dev')); //요청과 응답에 대한 정보를 콘솔에 출력해주는 미들웨어
app.use('/', express.static(path.join(__dirname, 'public'))); //정적인 파일(CSS,JS)등을 제공해주는 폴더를 지정, 현재는 /public 폴더임
app.use(express.json());//JSON 형식의 요청을 해석해서 req.body 객체로 만들어줌
app.use(express.urlencoded({ extended: false}));//쿼리스트링 형식의 요청을 해석해서 req.body 객체로 만들어줌
app.use(cookieParser(process.env.COOKIE_SECRET));//쿠키와 관련된 미들웨어, 아직 사용 안함
app.use(session({//세션과 관련된 미들웨어, 아직 사용 안함
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

//각각의 주소에 요청이 들어왔을 때 각각의 라우터로 이동
//각각의 주소 : index는 /, post는 /post
app.use('/', indexRouter);
app.use('/post', postRouter);

//에러 처리 코드
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})