# Cart-Witnessing

## 소개
Cart-Witnessing는 전도인의 짝배정 및 순번을 관리하는 서비스

## 기능
- 실시간 전시대 순서 업데이트
- 실시간 짝 배정 


## 설치 방법
1. 이 저장소를 클론합니다:
   ```bash
   git clone https://github.com/username/cart-witnessing.git
   ```
2. 필요한 패키지를 설치합니다:
   ```bash
   cd cart-witnessing
   npm install
   ```

## 사용법
1. 애플리케이션을 시작합니다:
   ```bash
   npm start
   ```
2. 웹 브라우저에서 `http://localhost:4040`에 접속합니다.

## 기여
기여를 원하시는 분은 이슈를 생성하거나 풀 리퀘스트를 제출해 주세요.

## 사용 방법 예시
1. 스케줄 입력 페이지에서 위치, 시작 시간, 사람명을 입력한 후 추가 클릭하면, 다음과 같은 이미지 확인이 가능합니다.
2. 짝 배정 시간 간격은 다음과 같습니다:
   - 8명일 경우: 15분 간격
   - 5명 이하일 경우: 30분 간격
   - 그 외의 경우: 20분 간격

참여자 예시:
   - 4명: 김석한, 김현우, 박우준, 박희정
   - 5명: 김석한, 김현우, 박우준, 박희정, 조광현
   - 6명: 김석한, 김현우, 박우준, 박희정, 조광현, 최대원
   - 7명: 김석한, 김현우, 박우준, 박희정, 조광현, 최대원, 한동수
   - 8명: 김석한, 김현우, 박우준, 박희정, 조광현, 최대원, 한동수, 허일

![alt text](<스크린샷 2024-09-09 오후 7.46.25.png>)
![alt text](<스크린샷 2024-09-09 오후 7.47.31.png>) 
![alt text](<스크린샷 2024-09-09 오후 8.03.05.png>) 
![alt text](<스크린샷 2024-09-09 오후 8.04.21.png>)