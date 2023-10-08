import 'package:book_list1/models/book.dart';

class BookRepository{
  final List<Book> _dummyBooks = [
    Book(
      title: "예제부터 배우는 거꾸로 파이썬",
      subtitle: "IT 비전공자라도 프로그래밍 문법을 몰라도 재미있게 코딩하고 원하는 것을 직접 만든다!",
      description: '''이 책은 독학으로 코딩을 공부한 저자가 만든 여섯 가지 파이썬 실생활 예제를 다룬다. 어렵고 불필요한 문법은 30분 만에 끝내고 ‘로또 당첨 지도’, ‘맛집 검색기’, ‘재무제표 추출’, ‘배달 앱 리뷰 시각화’, ‘이메일 자동화’, ‘스포츠 경기 과거 데이터 수집’과 같이 흥미롭고 유용한 예제를 무작정 따라 만들어 보도록 구성했다. 어려운 문법은 필요 없다! 나에게 필요한 기능만 익혀, 일상의 것들을 자동화하고 데이터를 내가 원하는 모습으로 가공 및 활용해 보자. 『예제부터 배우는 거꾸로 파이썬』과 함께라면 혼자서도 충분히 가능하다.
 
0~1장에서는 저자가 개발을 시작한 이유와 독학한 방법 그리고 어떤 것을 개발했는지를 이야기한다. 2장에서는 실습 예제를 다루기 위한 최소한의 파이썬 개념을 익힌다. 3장에서는 여섯 가지 예제를 따라 만들며 데이터 크롤링과 자동화, 시각화와 API까지 다룬다. 3장의 예제를 모두 따라 만든다면 여러분의 일상 속 적재적소에 코딩을 활용하여 필요한 것을 직접 만들어낼 수 있을 것이다.''',
      image: 'https://blog.kakaocdn.net/dn/bryLDA/btrIMBW3FAB/eFTxvdukNYKr4X8TmtpDik/img.jpg',
    ),
    Book(
      title: "나만 따라와! 같이 음악 만들자 feat. 로직 프로 10.6",
      subtitle: "나만의 첫 번째 음악을 만들고 싶은 분들은 주목! 당신의 음악에 날개를 달아 줄 ‘로직 프로 입문자용 가이드북’",
      description: '''이 책은 로직 프로를 처음 쓰는 사람도 천천히 따라 하기만 하면 노래를 만들 수 있는 ‘로직 프로 입문자용 가이드북’입니다. 필요 없는 기능은 과감히 버리고, 꼭 필요한 기능들만 최신 버전으로 담았습니다. 단순히 로직 프로라는 DAW 기능 설명에서 벗어나 실제 워크 플로우에 맞춘 구성 덕분에, 초보자도 기본적인 사용법부터 레코딩, 믹싱까지 충분히 다룰 수 있습니다.''',
      image: 'https://blog.kakaocdn.net/dn/Gs2nT/btrlyqKO9XK/BZzl1zu9apQkHOJQWNTav1/img.png',
    ),
    Book(
      title: "이야기로 다가가는 HTML",
      subtitle: "어려운 코딩 없이 쉽게 이해하는 HTML 입문서",
      description: '''정말 쉽게 코딩을 배울 수는 없을까? 오랜 고민 끝에, HTML을 가르쳐 주는 에세이 《이야기로 다가가는 HTML》 도서가 나왔습니다. 개발자이자 글을 쓰는 작가인 저자는, <head>, <title> 등 여러 가지 HTML 태그를 재밌는 일상의 이야기로 설명합니다. 또한 모든 태그를 QR코드를 통해 실제 코드로 실습할 수 있어, 심층적인 이해까지 도왔습니다. 이 책이 여러분에게 휴식과 디저트 같은 지식이 되기를 바랍니다.''',
      image: 'https://blog.kakaocdn.net/dn/cTLlsr/btro8waDgkF/kK1yvWzc3HBBmnwtmpIVq1/img.jpg',
    ),
  ];

  List<Book> getBooks(){
    return _dummyBooks;
  }
}