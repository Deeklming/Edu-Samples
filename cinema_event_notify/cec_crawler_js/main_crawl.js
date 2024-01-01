const knex = require('./knex/knex.js');//js orm
const {Builder, By} = require('selenium-webdriver');//셀레니움
const chrome = require('selenium-webdriver/chrome');//크롬 드라이버 미리 설치되어 있어야 함

const targets = {//각 사이트 주소
    lotteMovie: "https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=20",
    lottePreview: "https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=40",
    lotteHOT: "https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=10",
    lotteDiscounts: "https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=50",
    lotteNearCinema: "https://event.lottecinema.co.kr/NLCHS/Event/NearCinemaList",
    cgvMovie: "http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=004",
    cgvSpecial: "http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=001",
    cgvClub: "http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=008",
    cgvDiscounts: "http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=006",
    cgvNearCinema: "http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=005",
    megaMovie: "https://www.megabox.co.kr/event/movie",
    megaPreview: "https://www.megabox.co.kr/event/curtaincall",
    megaPick: "https://www.megabox.co.kr/event/megabox",
    megaDiscounts: "https://www.megabox.co.kr/event/promotion",
    megaNearCinema: "https://www.megabox.co.kr/event/theater"
};
const regex = /\d{4}.\d{2}.\d{2}/g;//날짜 추출 정규식
const sleep = (time) => new Promise((resolve)=>setTimeout(resolve, time));//await time sleep

async function pgdb_call(){//pgdb 데이터 모두 호출
    let data = await knex.select('*').from('cec_event_table');
    await sleep(1500);
    return data;
}

async function pgdb_save(vs){//pgdb 새로운 데이터 저장
    for(let v of vs){
        let q_insert = '';
        if(v.dday==99999){
            q_insert = `INSERT INTO cec_event_table VALUES(
                ${v.id}, '${v.cinema}', '${v.groups}', '${v.title}', '{}', ${v.dday}, '${v.urls}'
            );`;
        }else{
            q_insert = `INSERT INTO cec_event_table VALUES(
                ${v.id}, '${v.cinema}', '${v.groups}', '${v.title}', '{${v.dates[0]}, ${v.dates[1]}}', ${v.dday}, '${v.urls}'
            );`;
        }
        await knex.raw(q_insert).then(function(resp){
            console.log(`<success: pgdb_save ${v.id}>`);
        }).catch(function(err){
            console.log('<error: pgdb_save>', err);
        });
    }
    await sleep(1500);
}

async function pgdb_clear(){//pgdb 데이터 모두 삭제
    await knex.raw("TRUNCATE TABLE cec_event_table CASCADE;").then(function(resp){
        console.log(`<success: pgdb_clear>`);
    }).catch(function(err){
        console.log('<error: pgdb_clear>', err);
    });
    await sleep(1500);
}

async function re_data(odata){//today 데이터 pgdb table column에 맞게 재가공
    let rdata = [];
    let i = 1;
    let y = new Date();
    let ymd = new Date(`${y.getFullYear()}-${y.getMonth()+1}-${y.getDate()}`);
    for(let tg of odata){
        for(let x=0; x<tg.title.length; x++){
            let tmp = {};
            tmp.id = i;
            tmp.cinema = tg.cinema;
            tmp.groups = tg.groups;
            tmp.title = tg.title[x];
            if(tg.dates[x]==''){
                tmp.dates = [];
                tmp.dday = 99999;
            }else{
                let d = tg.dates[x].match(regex);
                tmp.dates = d;
                let bdt = new Date(d[1]);
                tmp.dday = Math.ceil((bdt.getTime()-ymd.getTime())/(1000*3600*24));
            }
            tmp.urls = tg.urls;
            rdata.push(tmp);
            i++;
        }
    }
    return rdata;
}

async function plus_btn(driver, v){//더보기 button click
    while(true){
        try{
            await driver.findElement(By.css(v)).click();
            await sleep(1500);
        }catch{
            break;
        }
    }
}

async function lotte_p(driver, target, e){//lotte cinema crawling
    await driver.get(target);
    await driver.manage().setTimeouts({implicit: 5000});//target page 켜질 때 까지 기다리는 시간
    let event_add = {
        cinema: 'LOTTE CINEMA',
        groups: e,
        title: [],
        dates: [],
        urls: target
    };

    if(e=="lotteNearCinema"){//LOTTE CINEMA에서 lotteNearCinema일 경우
        try{
            let event_tag = await driver.findElements(By.css(".ev_bn_wrap > li > a"));
            for(let x of event_tag){
                let title = await x.findElement(By.css("strong")).getText();
                let date = await x.findElement(By.css(".bn_tit_date")).getText();
                event_add.title.push(title);
                event_add.dates.push(date);
            }
        }catch(err){
            console.log(`<error: lotte_p(${e})>`, err);
        }
        await sleep(1000);
        return event_add;
    }

    await plus_btn(driver, ".btn_txt_more");
    await sleep(1200);
    try{
        let event_tag = await driver.findElements(By.css(".img_lst_wrap > li > a"));
        for(let x of event_tag){
            let title = await x.findElement(By.css("img")).getAttribute('alt');
            let date = await x.findElement(By.css("div")).getText();
            event_add.title.push(title);
            event_add.dates.push(date);
        }
    }catch(err){
        console.log(`<error: lotte_p(${e})>`, err);
    }
    await sleep(1000);
    return event_add;
}

async function cgv_p(driver, target, e){//cgv crawling
    await driver.get(target);
    await driver.manage().setTimeouts({implicit: 5000});
    let event_add = {
        cinema: 'CGV',
        groups: e,
        title: [],
        dates: [],
        urls: target
    };

    await plus_btn(driver, ".btn-item-more");
    await sleep(1200);
    try{
        let event_tag = await driver.findElements(By.css(".sect-evt-item-list > li > a"));
        for(let x of event_tag){
            let title = await x.findElement(By.css(".evt-desc > .txt1")).getText();
            let date = await x.findElement(By.css(".evt-desc > .txt2")).getText();
            event_add.title.push(title);
            event_add.dates.push(date);
        }
    }catch(err){
        console.log(`<error: cgv_p(${e})>`, err);
    }
    await sleep(1000);
    return event_add;
}

async function mega_p(driver, target, e){//megabox crawling
    await driver.get(target);
    await driver.manage().setTimeouts({implicit: 5000});
    let event_add = {
        cinema: 'MEGABOX',
        groups: e,
        title: [],
        dates: [],
        urls: target
    };

    await sleep(1200);
    try{
        let event_tag = await driver.findElements(By.css(".event-list > ul > li > a"));
        for(let x of event_tag){
            let title = await x.findElement(By.css(".tit")).getText();
            let date = await x.findElement(By.css(".date")).getText();
            event_add.title.push(title);
            event_add.dates.push(date);
        }
    }catch(err){
        console.log(`<error: mega_p(${e})>`, err);
    }
    await sleep(1000);
    return event_add;
}


(async function do_crawling() {//main start
    let options = new chrome.Options();
    try {
        while(true){
            let driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser('chrome')
            .build();
            let today = [];

            let a = await lotte_p(driver, targets.lotteMovie,'lotteMovie');
            let b = await lotte_p(driver, targets.lottePreview,'lottePreview');
            let c = await lotte_p(driver, targets.lotteHOT,'lotteHOT');
            let d = await lotte_p(driver, targets.lotteDiscounts,'lotteDiscounts');
            let e = await lotte_p(driver, targets.lotteNearCinema,'lotteNearCinema');
            today.push(a,b,c,d,e);

            a = await cgv_p(driver, targets.cgvMovie,'cgvMovie');
            b = await cgv_p(driver, targets.cgvSpecial,'cgvSpecial');
            c = await cgv_p(driver, targets.cgvClub,'cgvClub');
            d = await cgv_p(driver, targets.cgvDiscounts,'cgvDiscounts');
            e = await cgv_p(driver, targets.cgvNearCinema,'cgvNearCinema');
            today.push(a,b,c,d,e);

            a = await mega_p(driver, targets.megaMovie,'megaMovie');
            b = await mega_p(driver, targets.megaPreview,'megaPreview');
            c = await mega_p(driver, targets.megaPick,'megaPick');
            d = await mega_p(driver, targets.megaDiscounts,'megaDiscounts');
            e = await mega_p(driver, targets.megaNearCinema,'megaNearCinema');
            today.push(a,b,c,d,e);

            today = await re_data(today);
            let db_data = await pgdb_call();
            for(let ele=0; ele<db_data.length; ele++){//today와 비교를 위해 dates 타입 변경
                let tmps = []
                if(db_data[ele].dates.length !== 0){
                    tmps.push(db_data[ele].dates[0].toISOString().match(regex)[0].replace(/\-/g, '.'));
                    tmps.push(db_data[ele].dates[1].toISOString().match(regex)[0].replace(/\-/g, '.'));
                    db_data[ele].dates = tmps;
                }
            }
            // let new_event = await today.filter(x => !db_data.includes(x));//차집합
            // console.log('td',today);
            // console.log('dd',db_data);
            if(today.toString() === db_data.toString()){
                console.log("변동된 이벤트 없음");
            }else{
                console.log("변동된 이벤트 있음");
                await pgdb_clear();
                await pgdb_save(today);
            }

            await driver.quit();
            // break;
            await sleep(1000*15);//15초
            // await sleep(1000*60*60*24-60000);//매일
        }
    } catch(err) {
        console.log("<error: do_crawling>", err);
    }
})();