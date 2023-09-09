const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatH5 = document.querySelector(".chath5");
const $chatP = document.querySelector(".chatp");
const $chatBtn = document.querySelector(".chatbtn");
const $chatSpinner = document.querySelector(".chatspinner");

// openAI API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 질문과 답변 저장
let data = [
    {
        role: "system",
        content: "assistant는 친절한 답변가이다.",
    },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// 사용자의 질문
let question;

// 버튼 색상 변경
const changeButtonColor = (rm, ad) => {
    $chatBtn.classList.remove(rm);
    $chatBtn.classList.add(ad);
}

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
        question = e.target.value;

        if(e.target.value != ""){
            changeButtonColor("border-gray-400", "border-blue-600");
        }else{
            changeButtonColor("border-blue-600", "border-gray-400");
        }
    });

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (que) => {
    if (que) {
        let Q={
            role: "user",
            content: `${que.trim()}로 만들 수 있는 음식은 뭐가 있나요?`,
        };
        data.forEach((it, index) => {
            if(it.role === "user"){
                data.splice(index, 1);
            }
        });
        data.push(Q);
        questionData.push(Q);
    }};

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
    if (question){
        questionData.map((el) => {
            $chatH5.innerText = el.content;
        });
        $chatP.innerText = "";

        questionData = [];
        question = false;
    }};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
    $chatP.innerText = answer;
};

// 로딩 이미지 옵션
const loadingSvg = () => {
    $chatSpinner.classList.toggle("hidden");
}

// api 요청보내는 함수
const apiPost = async () => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
    .then((res) => res.json())
    .then((res) => {
        loadingSvg();
        printAnswer(res.choices[0].message.content);
    })
    .catch((err) => {
        console.error(err);
    });
};

// submit
$form.addEventListener("submit", (e) => {
        e.preventDefault();
        loadingSvg();
        $input.value = "";
        changeButtonColor("border-blue-600", "border-gray-400");
        sendQuestion(question);
        apiPost();
        printQuestion();
    });
