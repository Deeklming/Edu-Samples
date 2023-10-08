const express = require('express');//백엔드용
const cookieParser = require('cookie-parser');//쿠키를 편하게 파싱하기 위해
const session = require('express-session');//세션을 편하게 쓰기 위해
const morgan = require('morgan');//로그를 위해

//set
const app = express()
app.set('port', process.env.PORT || 8080);

//common middleware
app.use(express.static(__dirname + '/staticfile'));//static 파일들을 자동으로 찾아 사용하기 위해
app.use(express.json());//req.body가 json형태일 때
app.use(express.urlencoded({extended: true}));//req.body가 폼에 대한 요청일 때, extended: true는 npm의 qs모듈, false는 node.js의 기본 내장인 queryString 사용
//만약 동영상, 이미지 등 nultipart형식 데이터는 multer 같은 다른 미들웨어를 추가적으로 설치해 사용
app.use(morgan('dev'));//request와 response를 포매팅해서 콘솔에 찍어주는 Logger API
//morgan은 주로 개발시에 dev옵션을 배포시에 combined옵션을 사용, 옵션: combined, common, dev, short, tiny
app.use(cookieParser('thisiscookie1234'));//암호화된 쿠키를 사용하기 위해 임의 문자 전송
app.use(session({
    secret: 'thisiscookie1234',//안전한 쿠키 전송을 위해 암호화, 쿠키 서명을 위해 cookie-parser값과 동일하게 설정
    resave: false,//새로운 요청 시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: true,//세션에 저장할 내용이 없어도 저장할지 설정
    cookie:{//종류: httpOnly, expires, domain, path, secure, sameSite 등
        httpOnly: true,//JS로 접근 불가능하게 만들어서 로그인 구현 시 필수
    },
    name: 'connect.sid'//세션 쿠키의 name 지정, connect.sid값이 기본이라 안 적어도 됨
}));

//routing
app.get('/', (req, res)=>{
    if(req.session.name){
        console.log(`${req.session.name}가 접속함`);
        res.sendFile(__dirname + '/staticfile/index_login.html');
    } else{
        console.log("로그인 하지 않은 사용자가 접속함");
        res.sendFile(__dirname + '/staticfile/index_logout.html');
    }
});

app.get('/login', (req, res)=>{
    console.log(req.session);
    //res.cookie(name, value, options) 세션 말고 쿠키를 사용할 경우 쿠키에 값 설정
    req.session.name = "나의 세션 이름1";//세션을 사용할 경우
    res.end('Login OK');
});

app.get('/logout', (req, res)=>{
    res.clearCookie('connect.sid');//세션 쿠키 삭제, session의 name을 적어 줌
    res.end('Logout OK');
});

app.get('/user/:id', (req, res)=>{
    res.send(req.params.id+" page.");
});

//running
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'port running...');
});