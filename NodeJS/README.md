# NodeJS
Node.js Programming

## Feature
- nodejs는 v8엔진으로 만들어진 자바스크립트용 런타임
- nodejs는 기본적으로 비동기적 처리함
- nodejs는 Single Thread(싱글 스레드)를 사용하고 Event Loop(이벤트 루프)를 사용
- 이벤트 루프는 새로운 이벤트가 없는지 계속 검사하고 있고 새로운 이벤트가 생기면 작업 스레드에게 그 이벤트를 맡기고 다시 새로운 이벤트가 없는지 검사함

## Version Check
```
node -v
```

## npm - package.json
npm은 node package manager의 약자로 수많은 라이브러리를 가지고 있고 library Dependency(종속성)를 관리해주는 역할을 함
```
npm init
```
커맨드로 프로젝트로 만들 폴더로 이동 후 명령어를 실행하여 package.json(프로젝트 관리)을 생성
### npm help
```
npm help - 설명
npm init - 초기설정
npm install 패키지명 - 설치
npm dedupe - 중복 패키지 정리
npm outdated - 패키지 버전 업데이트 확인
npm ls 패키지명 - npm 설치 항목 확인
npm version - 버전 확인
npm start - 기본적으로 node server.js 실행
npm stop - node 멈춤
npm restart - node 재실행
npm test - node 테스트
npm run scripts명령어 - package.json의 scripts에 설정된 명령어 실행
npm cache - 캐시 확인
npm cache clean + npm rebuild - npm 오류시 재설치
npm config list목록 - npm 설정 조회
npm set 이름, npm get 이름 - npm 설정 조작
```

## Info
1. package.json을 기반으로 실행
2. 모듈을 내보낼 때 exports, 불러올 때 require을 사용함
3. http 요청 메서드에는 get, post, put(전체 수정), patch(부분 수정), delete 등이 있음
### HTTP response status codes
```
100번대 - 정보 또는 서버가 요청을 받았고 클라이언트가 작업을 계속 진행해도 된다는 의미
200번대 - 성공 또는 요청을 성공적으로 받았다는 의미
300번대 - 리다이렉션 또는 요청을 완료하기 위해 추가적인 작업이 필요하다는 의미
400번대 - 클라이언트 서버 오류를 의미
500번대 - 서버 오류를 의미
```
```
200 - 요청 성공
204 - 요청 성공했으나 제공할 내용 없음
304 - 이전 요청과 동일
400 - 클라이언트 요청 오류
401 - 요청을 위한 권한 요구
403 - 요청이 서버에 의해 거부됨
404 - 요청한 url 찾을 수 없음
500 - 서버에 오류 발생하여 응답 불가
```

## express_basic.js
### Use Packages
* nodemon
* express
* cookie-parser
* express-session
* morgan
* axios
* dotenv
* redis
### Middleware
app.use(대상)를 사용함   
미들웨어는 위에서 아래로 순서가 중요하고 순서 제어를 위해 next를 사용   
```javascript
//next() 다음 미들웨어로 가는 역할
const express = require('express');
const app = express()

//middleware 있으면 좋은 위치

app.get('/', (req, res, next)=>{
    res.send('hi');
    next();
});

const myLog = function(req, res, next){//로그 생성 함수
    console.log('myLog');
    next();
}

app.use(myLog);// 위치 때문에 next()가 없으면 실행 안 됨
app.listen(8080, ()=>console.log('8080 port running...'));
```
```javascript
//next(error) 오류 처리 미들웨어로 가는 역할
app.use(function(err, req, res, next){//오류 처리 미들웨어
    console.error(err.stack);
    res.status(500).send('server error!');
});

//※ next('route') next()로 같은 라우터에서 분기처리를 할 때 사용
```
logger API를 사용할 때 콘솔의 morgan대신 json형태의 dump파일에 기록하는 winston같은 추가 미들웨어도 있음   
쿠키의 expire을 지정하지 않으면 클라이언트의 브라우저가 꺼지기 전까지 쿠키가 살아있음   
공통 미들웨어들에겐 next()가 내부에 내장되어 있어서 자동으로 넘어가지만 static에는 없기에 잘 설정해야 함

## open_api.js
다양한 서비스를 위해 openAPI를 사용
### axios
```
    장점

    axios는 Promise를 반환해 async/await을 사용할 수 있음
    구형 브라우저를 지원하고 요청을 중단시킬 수 있고 응답 시간 초과를 설정할 수 있음
    CSRF 보호 기능이 내장되어 있고 JSON 형식으로 자동 변환이 가능
```
```
    axios 사용법

    1. get 요청 전송
    axios(url, [기타 옵션]);
    ex) axios('/data/123');

    2. post 요청 전송
    ex) axios({
        method: 'post',
        url: '/data/123',
        data: {
            first: 'ABC',
            last: 'def'
        }
    });
    [기타 옵션]들 추가 가능

    3. 메서드 요청 전송
    axios.get(url, [기타 옵션]);
    axios.post(url, [데이터], [기타 옵션]);
    axios.put(url, [데이터], [기타 옵션]);
    axios.patch(url, [데이터], [기타 옵션]);
    axios.delete(url, [기타 옵션]);
    axios.request(옵션);
    axios.head(url, [기타 옵션]);
    axios.options(url, [기타 옵션]);
```
### dotenv
openAPI의 service key나 DB정보 같은 것을 코드 내에 삽입하게 되면 보안 문제가 있어서 dotenv 환경변수 파일로 따로 분리함   
.env 파일에 키=값 으로 이루어진 변수를 process.env 객체로 생성해 줌   
.env 파일은 보통 최상위 위치에 놓음

## caching_redis.js
### Caching System
사용자가 많지 않다고 해도 한 명이 하루 API 호출 횟수를 초과하여 사용할 수도 있고 데이터를 파싱하는 부분에서도 시간이 많이 걸려서 원할한 서버 구축을 위해 캐싱 시스템을 꼭 구축해야 함
#### Redis
Redis(Remote Dictionary Server)는 DBMS에서 키-값 형태의 NoSQL 중 하나임   
모든 데이터를 메모리에서 저장하고 조회하기 때문에 빠름   
Redis는 리스트와 배열 같은 데이터를 처리하는데 유용하고 보통 쿠키와 세션을 Redis에 저장해서 사용함
```
    linux
    debian: sudo apt-get install redis-server
    rocky: sudo dnf install redis-server
    ※ windows는 공식적으로는 지원 안함

    Redis 기본 포트: 6379
```
Redis의 자료구조에는 문자열, 해시, 리스트, 셋, 정렬셋 등이 있고 각 자료구조마다 명령어가 조금씩 다름
```javascript
    //Redis Server Test
    const redis = require('redis');
    const redisClient = redis.createClient(6379, '127.0.0.1');

    redisClient.rpush('myKey', 1);
    redisClient.rpush('myKey', 2);
    redisClient.rpush('myKey', 3);
    //Redis에 myKey: [1,2,3] 형태로 저장이 됨
```
※ redis 모듈의 문법은 v4이후의 것으로 따로 학습할 것은 권장함

## rest_api.js
REST(REpresentatinal State Transfer)는 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
```
    RESTful API 예시

    http 메서드 |  URI                      | 요청 내용 예측
    get         | /genre/mellow/movies      | 장르가 멜로인 영화 정보 조회
    post        | /genre/mellow/movies      | 새로운 영화를 멜로 분류에 등록
    put         | /genre/mellow/movies/3    | 장르가 멜로인 3번 영화의 정보를 변경
    patch       | /genre/mellow/movies/3    | 장르가 멜로인 3번 영화의 정보를 일부만 변경
    delete      | /genre/mellow/movies/3    | 장르가 멜로인 3번 영화의 정보를 삭제
    options     |                           | 요청 전 통신 옵션을 설명하기 위해 사용
```
※ 통합 자원 식별자인 URI(Uniform Resource Identifier)는 인터넷에 있는 자원을 나타내는 유일한 주소   
※ URI의 하위개념에 URL(Uniform Resource Locator)과 URN(Uniform Resource Name)이 있음
### API Test
API 테스트 도구인 Postman이나 Insomnia같은 것으로 테스트를 하면 편함
```
    GET localhost:8080/board
    POST localhost:8080/board
        json {
            "user_id": "유저 아이디",
            "title": "타이틀",
            "content": "내용입니다"
        }
    PUT localhost:8080/board/3
        json {
            "user_id": "유저 아이디",
            "title": "타이틀",
            "content": "내용 수정입니다"
        }
    DELETE localhost:8080/board/3
```
### UUID
UUID(Universally Unique Identifier)는 범용 고유 식별자로 네트워크에서 고유성이 보장되는 id를 만들기 위한 표준 규약임   
128bit 숫자로 이루어져 있고 32자리의 16진수로 표현함
**ex) ab287a73-1234-9876-d41aba87fc55**
nodejs에서 임시로 개발할 때 모듈 uuid-apikey를 사용하여 api key 인증을 구현할 수 있음
```
    API Test uuid

    POST localhost:8080/board
        json {
            "user_id": "idid1",
            "title": "타이틀 하하",
            "content": "내용입니다"
        }
    POST localhost:8080/board
        json {
            "user_id": "idid2",
            "title": "타이틀2",
            "content": "내용입니다2"
        }
    GET localhost:8080/board/M8EKDRX-RH0M8EF-KZ5PB6Q-73Z2K0A/search?keyword=하하
    GET localhost:8080/board/M8EKDRX-RH0M8EF-KZ5PB6Q-73Z2K0A/user?user_id=idid2
```
### CORS
CORS(Cross-Origin-Resource-Sharing)는 SOP(Same Origin Policy) 보안 모델에 따라 브라우저에서 서버에 접근할 때 포트만 달라도 다른 도메인으로 간주하여 막음   
해결하기 위해선 요청을 제공하는 서버에서 헤더에 Access-Control-Allow-Origin을 넣어줘야 함
```javascript
    app.get('/board/:apikey/:type', (req, res)=>{
        //...
        res.setHeader('Access-Control-Allow-Origin', '응답할 곳의 주소:응답할 곳의 포트');
        res.setHeader('Access-Control-Allow-Credentials', true);
        //...
    }
```
하지만 cors의 확장된 모듈을 이용하면 편함   
테스트는 rest_api.js를 먼저 실행 후 rest_api_cors_test.js를 실행 함
