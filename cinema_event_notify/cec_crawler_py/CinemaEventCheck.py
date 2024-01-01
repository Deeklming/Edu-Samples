from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager# 크롬 드라이버 자동 업데이트
import time
import pprint
from tkinter import *
from datetime import datetime

chrome_options = Options()# 옵션 선택
chrome_options.add_experimental_option("detach", True)# 브라우저 꺼짐 방지
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])# 불필요한 에러 메시지 삭제

service = Service(executable_path=ChromeDriverManager().install())# 크롬 드라이버 설치

lotteMovie = f"https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=20"
lottePreview = f"https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=40"
lotteHOT = f"https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=10"
lotteDiscounts = f"https://event.lottecinema.co.kr/NLCHS/Event/DetailList?code=50"
lotteNearCinema = f"https://event.lottecinema.co.kr/NLCHS/Event/NearCinemaList"

cgvMovie = f"http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=004"
cgvSpecial = f"http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=001"
cgvClub = f"http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=008"
cgvDiscounts = f"http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=006"
cgvNearCinema = f"http://www.cgv.co.kr/culture-event/event/defaultNew.aspx?mCode=005"

megaMovie = f"https://www.megabox.co.kr/event/movie"
megaPreview = f"https://www.megabox.co.kr/event/curtaincall"
megaPick = f"https://www.megabox.co.kr/event/megabox"
megaDiscounts = f"https://www.megabox.co.kr/event/promotion"
megaNearCinema = f"https://www.megabox.co.kr/event/theater"

# targets = [
#     lotteMovie, lottePreview, lotteHOT, lotteDiscounts, lotteNearCinema,
#     cgvMovie, cgvSpecial, cgvClub, cgvDiscounts, cgvNearCinema,
#     megaMovie, megaPreview, megaPick, megaDiscounts, megaNearCinema
# ]

def plus_btn(v):
    while True:
        try:
            more_btn = driver.find_element(By.CSS_SELECTOR, v)
            more_btn.click()
            time.sleep(1.5)
        except:
            break

def lottePage(target, s):
    driver.get(target)
    plus_btn(".btn_txt_more")
    event_add = []
    try:
        event_tag = driver.find_elements(By.CSS_SELECTOR, ".img_lst_wrap > li > a")
        for i, x in enumerate(event_tag):
            event_tmp = []
            title = x.find_element_by_tag_name("img")
            date = x.find_element_by_tag_name("div")
            event_tmp.append(i+1)
            event_tmp.append(title.get_attribute("alt"))
            event_tmp.append(date.text)
            event_add.append(event_tmp)
    except:
        print(f"<check - {s}> {target}")
    time.sleep(2)
    return event_add

def lotteNearCinemaPage(target):
    driver.get(target)
    event_add = []
    try:
        event_tag = driver.find_elements(By.CSS_SELECTOR, ".ev_bn_wrap > li > a")
        for i, x in enumerate(event_tag):
            event_tmp = []
            title = x.find_element_by_tag_name("strong")
            date = x.find_element_by_css_selector(".bn_tit_date")
            event_tmp.append(i+1)
            event_tmp.append(title.text)
            event_tmp.append(date.text)
            event_add.append(event_tmp)
    except:
        print(f"<check - lotteNearCinemaPage> {target}")
    time.sleep(2)
    return event_add

def cgvPage(target, s):
    driver.get(target)
    plus_btn(".btn-item-more")
    event_add = []
    try:
        event_tag = driver.find_elements(By.CSS_SELECTOR, ".sect-evt-item-list > li > a")
        for i, x in enumerate(event_tag):
            event_tmp = []
            title = x.find_element_by_css_selector(".evt-desc > .txt1")
            date = x.find_element_by_css_selector(".evt-desc > .txt2")
            event_tmp.append(i+1)
            event_tmp.append(title.text)
            event_tmp.append(date.text)
            event_add.append(event_tmp)
    except:
        print(f"<check - {s}> {target}")
    time.sleep(2)
    return event_add

def megaPage(target, s):
    driver.get(target)
    event_add = []
    try:
        event_tag = driver.find_elements(By.CSS_SELECTOR, ".event-list > ul > li > a")
        for i, x in enumerate(event_tag):
            event_tmp = []
            title = x.find_element_by_css_selector(".tit")
            date = x.find_element_by_css_selector(".date")
            event_tmp.append(i+1)
            event_tmp.append(title.text)
            event_tmp.append(date.text)
            event_add.append(event_tmp)
    except:
        print(f"<check - {s}> {target}")
    time.sleep(2)
    return event_add

class Alert:
    def __init__(self, tList) -> None:
        self.window = Tk()
        self.window.title("영화 이벤트 새소식")
        self.window.geometry("180x70+1+1")
        self.window.resizable(False, False)
        self.window.protocol('WM_DELETE_WINDOW', self.window.destroy)
        self.message=Message(self.window, text=f"{tList}", width=200, relief="solid")
        self.message.pack()
        self.window.after(5000, self.desto)
        self.window.mainloop()
    
    def desto(self):
        self.window.destroy()

if __name__=="__main__":
    print("영화 이벤트 체크 시작")
    event_last_log = {}
    while True:
        driver = webdriver.Chrome(service=service, options=chrome_options)# 드라이버 설정 및 시작
        driver.implicitly_wait(6)# 웹페이지가 로딩 될때까지 6초 기다림
        event_today = {}

        event_today["lotteMovie"] = lottePage(lotteMovie, "lotteMovie")
        event_today["lottePreview"] = lottePage(lottePreview, "lotteMovie")
        event_today["lotteHOT"] = lottePage(lotteHOT, "lotteMovie")
        event_today["lotteDiscounts"] = lottePage(lotteDiscounts, "lotteMovie")
        event_today["lotteNearCinema"] = lotteNearCinemaPage(lotteNearCinema)

        event_today["cgvMovie"] = cgvPage(cgvMovie, "cgvMovie")
        event_today["cgvSpecial"] = cgvPage(cgvSpecial, "cgvSpecial")
        event_today["cgvClub"] = cgvPage(cgvClub, "cgvClub")
        event_today["cgvDiscounts"] = cgvPage(cgvDiscounts, "cgvDiscounts")
        event_today["cgvNearCinema"] = cgvPage(cgvNearCinema, "cgvNearCinema")

        event_today["megaMovie"] = megaPage(megaMovie, "megaMovie")
        event_today["megaPreview"] = megaPage(megaPreview, "megaPreview")
        event_today["megaPick"] = megaPage(megaPick, "megaPick")
        event_today["megaDiscounts"] = megaPage(megaDiscounts, "megaDiscounts")
        event_today["megaNearCinema"] = megaPage(megaNearCinema, "megaNearCinema")

        pprint.pprint(event_last_log)
        pprint.pprint(event_today)

        if event_today != event_last_log:
            print("알림")
            Alert(f"<{datetime.now().date()}> 새로운 이벤트 있음")

            event_last_log = event_today
        else:
            print(f"<{datetime.now().date()}> 나에게 새로운 이벤트를 달라!")
        driver.quit()
        #time.sleep(10) 10초 마다
        time.sleep(3600*24-60)# 하루 마다
