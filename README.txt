NATURE MIST 쇼핑몰 업로드 안내

1. 이 폴더 안의 파일을 그대로 웹호스팅(예: Netlify, Vercel, GitHub Pages, Cafe24 웹호스팅)에 올리세요.
   폴더 없이 모든 파일을 한 곳(루트)에 그대로 올리면 됩니다. index.html 이 첫 화면입니다.

2. 올리기 전에 shop.dc.html 을 메모장/코드 편집기로 열어 아래 값을 실제 정보로 바꾸세요.
   (파일 안에서 "data-props" 를 검색하면 나옵니다)
   - bankName / accountNumber / accountHolder : 입금 받을 계좌 (지금은 가짜 계좌입니다!)
   - depositHours : 입금 기한(시간)
   - tossLink : 토스 송금 링크 (선택)
   - cardPayLink : 카드 결제 링크 (선택)
   - orderEndpoint : 주문 알림을 받을 Formspree 주소 (권장)
   - sellerEmail : 주문 알림 이메일 (선택)
   - launchSale : 출시 10% 할인 on/off (true / false)

3. 주소 검색(다음 우편번호)은 실제 인터넷 주소에 올렸을 때 정상 동작합니다.

4. 판매 전 확인: 개인정보처리방침, 판매자 정보(상호·연락처·통신판매업 신고번호), 교환·환불 안내.

파일 설명
- index.html            첫 화면 (shop.dc.html 로 이동)
- shop.dc.html          쇼핑몰
- film.dc.html          홈페이지에 들어가는 브랜드 영상
- support.js, *.jsx     화면을 그리는 스크립트
- styles.css, ds-bundle.js  디자인 스타일
- *.png                 제품 이미지
