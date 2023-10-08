//간단한 게시판 REST API 서버
const express = require('express');
const morgan = require('morgan');
const path = require('path');//파일 경로 설정을 위해
const dotenv = require('dotenv');//안전한 환경 설정을 위해
const url = require('url');//요청 주소 뒤에 ?key=value형식의 url 파싱을 위해
const uuidAPIkey = require('uuid-apikey');//메모리에 임시 API키 사용을 위해
const cors = require('cors');//SOP 보안 모델을 피해 접근을 위해

//set
const app = express()
dotenv.config({path: path.resolve(__dirname + "\\.env")});//dotenv 경로를 설정함
app.set('port', process.env.PORT);

//common middleware
app.use(express.json());//req.body가 json형태일 때
app.use(express.urlencoded({extended: true}));//req.body가 폼에 대한 요청일 때, extended: true는 npm의 qs모듈, false는 node.js의 기본 내장인 queryString 사용
//만약 동영상, 이미지 등 nultipart형식 데이터는 multer 같은 다른 미들웨어를 추가적으로 설치해 사용
app.use(morgan('dev'));//request와 response를 포매팅해서 콘솔에 찍어주는 Logger API
//morgan은 주로 개발시에 dev옵션을 배포시에 combined옵션을 사용, 옵션: combined, common, dev, short, tiny
app.use(cors());//모든 라우터에 cors 적용, 물론 일부 라우터에만 적용도 가능

//test를 위한 API키
//console.log(uuidAPIkey.create()); - 로그로 나오는 것을 복사해서 아래 api_key 변수에 담아줌
const api_key = {
    apiKey: 'M8EKDRX-RH0M8EF-KZ5PB6Q-73Z2K0A',
    uuid: 'a21d36e3-c441-4439-9fcb-659a38fe2981'
}

//DBMS 대신 게시글 데이터
let boardList = [];
let boardIndex = 0;

//routing
app.get('/', (req, res)=>{
    res.send('rest api page');
});

app.get('/board/:apikey/:type', (req, res)=>{//게시글 검색에 uuid-key api 사용
    let {type, apikey} = req.params;
    const queryData = url.parse(req.url, true).query;//url 쿼리스트링 파싱
    if(uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, api_key.uuid)){//isAPIKey()와 check()로 url로 들어온 키가 유효한지 확인
        if(type === "search"){//키워드로 게시글 검색
            const keyword = queryData.keyword;
            const result = boardList.filter((e)=>{
                return e.title.includes(keyword);//title값이 keyword에 포함되었는지 확인
            });
            res.send(result);
        } else if(type === "user"){//닉네임으로 게시글 검색
            const user_id = queryData.user_id;
            const result = boardList.filter((e)=>{
                return e.user_id === user_id;//boardList의 user_id와 쿼리스트링의 user_id가 일치하는지 확인
            });
            res.send(result);
        } else{
            res.send('Wrong URL');
        }
    } else{
        res.send('Wrong API key');
    }
});

app.get('/board', (req, res)=>{
    res.send(boardList);
});

app.post('/board', (req, res)=>{
    const board = {
        "user_id": req.body.user_id,
        "id": ++boardIndex,
        "title": req.body.title,
        "date": new Date(),
        "content": req.body.content
    };
    boardList.push(board);
    
    res.redirect('/board');
});

app.put('/board/:id', (req, res)=>{//url에서 :변수명으로 값을 받아 사용
    const findItem = boardList.find((it)=>{
        return it.id == ++req.params.id;
    });
    
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);//같은 id값이 있으면 삭제

    const board = {//새로운 요소 추가
        "user_id": req.params.user_id,
        "id": ++req.params.id,
        "title": req.body.title,
        "date": new Date(),
        "content": req.body.content
    };
    boardList.push(board);
    
    res.redirect('/board');
});

app.delete('/board/:id', (req, res)=>{
    const findItem = boardList.find((it)=>{
        return it.id == ++req.params.id;
    });
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    res.redirect('/board');
});

//running
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'port running...');
});
