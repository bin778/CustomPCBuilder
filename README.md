<div>
<h1>🔌CustomPCBuilder</h1>
</div>

## 프로젝트 소개
* 사용자가 원하는 키워드를 입력하면 원하는 용도와 가격으로 조립 컴퓨터를 구매할 수 있는 웹 사이트
* 온라인 견적은 기존 컴퓨터 견적 사이트와 비슷하게 사용자가 직접 컴퓨터 부품을 선택하고 견적을 맞추기 가능
* 맞춤 견적은 사용자가 키워드를 입력하면 키워드를 서버에 전송한 다음 알맞은 부품을 선정해 견적을 맞춰 견적 결과를 사용자에게 보여줌.

## 프로젝트 배포
* 플랫폼: AWS EC2 Ubuntu
* 배포일: 2024/05/17
* 사이트 주소: http://3.39.182.23:3000
* AWS에서 요금이 과금될 경우 프로젝트 배포가 중단될 수 있음.

## 개발 동기
* 컴퓨터 부품에 대해 지식이 부족한 사람은 용어 자체가 낯설어서 조립PC 견적을 맞추기가 어려운 경우가 많아 비싼 브랜드 PC를 구매하거나 조립 PC를 맞추더라도 더 비싼 컴퓨터를 구매하는 경우가 많음.
* 이러한 사용자들을 위해 컴퓨터 부품에 대해 알지 못하더라도 원하는 키워드를 입력하면 원하는 용도와 가격으로 컴퓨터 견적을 맞출 수 있는 CustomPCBuilder라는 웹 사이트를 제작

## 개발 인원
* 최영빈(개인 졸업 프로젝트)

## 개발 기간
* 2023.08~2023.12⏰

## 개발 환경
#### Front-End

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
#### Back-End

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

## 화면 구성
| 로그인 화면 | 메인 화면 |
| :----------------------: | :----------------------: |
| ![login](https://github.com/bin778/CustomPCBuilder/assets/31675860/9ee0151d-55d5-415a-9139-8315595af384) | ![main](https://github.com/bin778/CustomPCBuilder/assets/31675860/f3dbd853-5059-4e34-9319-e86538a58ff5) |
| 온라인 견적 | 맞춤 견적 |
| ![quote](https://github.com/bin778/CustomPCBuilder/assets/31675860/367b94ba-3fd3-4598-9586-ccae90fc4628) | ![keyword](https://github.com/bin778/CustomPCBuilder/assets/31675860/dd0b4c0f-8139-4792-9078-8de95b4c77c4) |

## 기능 소개
### ⭐ 로그인 & 회원가입 기능
* 회원가입할 때 정규표현식을 사용하여 이메일이나 비밀번호, 생년월일 등 형식에 맞게 입력하도록 유효성 검사
* 회원가입에 성공하면 회원 정보는 회원 DB에 저장
* 로그인을 해야 메인 페이지로 접근 가능

### ⭐ 온라인 견적
* 각 컴퓨터 부품을 사용자가 직접 원하는 상품으로 선택 가능
* 상품을 선택하면 수량을 조절해서 가격이나 전력량의 합을 계산
* 선택한 파워의 출력량이 각 부품의 총 전력량보다 작을 경우 빨강색으로 경고 표시가 나오도록 함

### ⭐ 맞춤 견적
* 사용자가 직접 키워드를 입력해서 키워드가 Django 서버에 전송하여 맞는 부품을 찾아내어 원하는 견적을 사용자에게 보여줌
* 만약 키워드가 2개 이상 감지될 경우, 두 개의 용도 키워드 중 더 높은 점수를 가진 부품으로 설정하여 견적에 반영

## 실행 장면
### 온라인 견적
![quote](https://github.com/bin778/CustomPCBuilder/assets/31675860/8729b665-4dac-4e86-bc27-c2b70787eda3)
### 맞춤 견적
![keyword](https://github.com/bin778/CustomPCBuilder/assets/31675860/cc0a4bc3-2d16-4890-a17c-cf9cab6ced0d)

## 디렉터리 구성
```bash
📦CustomPCBuilder
 ┣ 📂backend
 ┃ ┣ 📂public
 ┃ ┃ ┗ 📜index.html
 ┃ ┣ 📂src : API, DB 모델 폴더
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📜db.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📂cpb_django : Django 서버 관련 폴더
 ┃ ┃ ┃ ┣ 📂cpb_django
 ┃ ┃ ┃ ┣ 📂ml_quote
 ┃ ┃ ┃ ┃ ┣ 📜admin.py
 ┃ ┃ ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┃ ┃ ┣ 📜keyword.py : 사용자가 입력한 키워드에 맞는 컴퓨터 견적을 자동으로 구성함.
 ┃ ┃ ┃ ┃ ┣ 📜models.py : Django DB 모델
 ┃ ┃ ┃ ┃ ┣ 📜tests.py
 ┃ ┃ ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┃ ┃ ┣ 📜views.py
 ┃ ┃ ┃ ┃ ┗ 📜__init__.py
 ┃ ┃ ┃ ┣ 📜db.sqlite3
 ┃ ┃ ┃ ┣ 📜manage.py
 ┃ ┃ ┃ ┗ 📜my_settings.py
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┗ 📜server.js
 ┣ 📂frontend
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📂Parts : 부품 별 이미지 사진
 ┃ ┃ ┃ ┣ 📂Case
 ┃ ┃ ┃ ┣ 📂Cooler
 ┃ ┃ ┃ ┣ 📂CPU
 ┃ ┃ ┃ ┣ 📂MainBoard
 ┃ ┃ ┃ ┣ 📂Memory
 ┃ ┃ ┃ ┣ 📂Power
 ┃ ┃ ┃ ┣ 📂Storage
 ┃ ┃ ┃ ┗ 📂VideoCard
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┗ 📜robots.txt
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┣ 📜AccountDelete.scss
 ┃ ┃ ┃ ┣ 📜Header.scss
 ┃ ┃ ┃ ┣ 📜Keyword.scss
 ┃ ┃ ┃ ┣ 📜Login.scss
 ┃ ┃ ┃ ┣ 📜Main.scss
 ┃ ┃ ┃ ┣ 📜Quote.scss
 ┃ ┃ ┃ ┗ 📜SignUp.scss
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┣ 📂view
 ┃ ┃ ┃ ┣ 📂Component
 ┃ ┃ ┃ ┃ ┗ 📜Header.jsx : 헤더 상단 바
 ┃ ┃ ┃ ┣ 📜AccountDelete.jsx
 ┃ ┃ ┃ ┣ 📜Keyword.jsx : 키워드 견적 기능. 사용자가 입력한 키워드는 Django에서 처리함.
 ┃ ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┃ ┣ 📜Main.jsx
 ┃ ┃ ┃ ┣ 📜Quote.jsx : 온라인 견적 기능. 사용자가 직접 컴퓨터 부품을 견적 추가 및 삭제.
 ┃ ┃ ┃ ┗ 📜SignUp.jsx
 ┃ ┃ ┣ 📜App.js
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜package-lock.json
 ┃ ┗ 📜package.json
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜.hintrc
 ┗ 📜README.md
```
