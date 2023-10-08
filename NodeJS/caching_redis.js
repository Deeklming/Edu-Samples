//공공데이터포털을 이용한 미세먼지 정보 - 한국환경공단_에어코리아_대기오염정보, redis 사용
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');//openAPI 사용을 위해
const path = require('path');//파일 경로 설정을 위해
const dotenv = require('dotenv');//안전한 환경 설정을 위해
const redis = require('redis');//캐싱 시스템을 위해, v4(버전) 문법 사용

//set
const app = express()
dotenv.config({path: path.resolve(__dirname + "\\.env")});//dotenv 경로를 설정함
app.set('port', process.env.PORT);
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    legacyMode: true
});//redis 연결 설정, legacyMode: true로 v4이전 문법 사용 가능

//db server
redisClient.on('error', (err)=>{//redis error 확인
    console.error('Redis Error: '+err);
});
redisClient.connect().then((ok)=>{
    console.log('Redis Connect Success');
});//redis 연결

//common middleware
app.use(express.json());//req.body가 json형태일 때
app.use(express.urlencoded({extended: true}));//req.body가 폼에 대한 요청일 때, extended: true는 npm의 qs모듈, false는 node.js의 기본 내장인 queryString 사용
//만약 동영상, 이미지 등 nultipart형식 데이터는 multer 같은 다른 미들웨어를 추가적으로 설치해 사용
app.use(morgan('dev'));//request와 response를 포매팅해서 콘솔에 찍어주는 Logger API
//morgan은 주로 개발시에 dev옵션을 배포시에 combined옵션을 사용, 옵션: combined, common, dev, short, tiny

//routing
app.get('/airkorea', async (req, res)=>{
    await redisClient.lrange('airItems', 0, -1, async (err, cachedItems)=>{
        if(err) throw err;
        if(cachedItems.length){
            res.send(`데이터를 캐시 시스템에서 가져옴
            <br /> 지역: 서울 ${cachedItems[0]} / 시간: ${cachedItems[1]}
            <br /> 미세먼지: ${cachedItems[2]}
            <br /> 초미세먼지: ${cachedItems[3]}`);
        } else{
            const serviceKey = process.env.airServiceKey;//인코딩된 일반 인증키
            const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?";//시도별 실시간 측정정보 조회
            let parmas = encodeURI('serviceKey')+'='+serviceKey;
            parmas += '&'+encodeURI('returnType')+'='+encodeURI('json');
            parmas += '&'+encodeURI('numOfRows')+'='+encodeURI('1');
            parmas += '&'+encodeURI('pageNo')+'='+encodeURI('1');
            parmas += '&'+encodeURI('sidoName')+'='+encodeURI('서울');
            parmas += '&'+encodeURI('ver')+'='+encodeURI('1.3');

            const url = airUrl+parmas;

            try{
                const result = await axios.get(url);//await으로 해줘야 결과를 기다려서 받을 수 있음
                // res.json(result.data);//axios로 받은 데이터 뒤에 꼭 .data를 붙여줘야 함
                const airItem = {
                    "location": result.data.response.body.items[0]["stationName"],//측정소명
                    "time": result.data.response.body.items[0]["dataTime"],//측정일시
                    "pm10": result.data.response.body.items[0]["pm10Value"],//미세먼지
                    "pm2_5": result.data.response.body.items[0]["pm25Value"],//초미세먼지
                };
                const badAir = [];

                if(airItem.pm10 <= 30){
                    badAir.push("미세먼지 좋음");
                } else if(airItem.pm10>30 && airItem.pm10<=80){
                    badAir.push("미세먼지 보통");
                } else{
                    badAir.push("미세먼지 나쁨");
                }

                if(airItem.pm2_5 <= 15){
                    badAir.push("초미세먼지 좋음");
                } else if(airItem.pm2_5>15 && airItem.pm2_5<=35){
                    badAir.push("초미세먼지 보통");
                } else{
                    badAir.push("초미세먼지 나쁨");
                }

                const airItems = [airItem.location, airItem.time, badAir[0], badAir[1]];
                airItems.forEach((V)=>{//redis에 데이터를 리스트로 담아줌
                    redisClient.rPush('airItems', V);//(key, value)
                })
                redisClient.expire('airItems', 60*60);//데이터의 유효 시간, 60분 뒤 소멸

                res.send(`캐시된 데이터가 없음`);
            } catch(err){
                console.log(err);
            }
        }
    });
});

//running
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'port running...');
});