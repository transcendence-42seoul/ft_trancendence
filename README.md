# 실시간 Pong 미니 게임

한줄 소개: 실시간으로 친구들과 pong을 즐겨보자
진행 기간: 2023년 10월 11일
Skills: Nest.js, Node.js, React.js, Tailwind, Typescript
팀구성: 풀스택 5명

# **About**


- 실시간으로 Pong 미니 게임을 다른 유저들과 즐겨보자.

# 실행방법

.env_template 내용을 복사해서 복사해서 같은 위치에 .env파일을 생성하고 붙여넣기한다.

docker가 설치되어있다고 가정 후,

```
make
```
makefile을 실행 후, localhost:5173으로 접속한다.

# 프로젝트 기능

---

- 채팅 룸 생성
- 채팅 ban 기능
- 친구 추가
- 실시간 Pong 게임 with Socket
- 게임 중 실시간 채팅
- 42Seoul API, JWT를 이용한 로그인

## DB 설계

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%20Pong%20%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20a4c95d72e4c94773a7eb2b4c804545e3/Untitled.png)

## UI/UX 기본 설계

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%20Pong%20%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20a4c95d72e4c94773a7eb2b4c804545e3/Untitled%201.png)

## 미리보기

---

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%20Pong%20%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20a4c95d72e4c94773a7eb2b4c804545e3/Untitled%202.png)

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%20Pong%20%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20a4c95d72e4c94773a7eb2b4c804545e3/Untitled%203.png)

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%20Pong%20%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20a4c95d72e4c94773a7eb2b4c804545e3/Untitled%204.png)

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%20Pong%20%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20a4c95d72e4c94773a7eb2b4c804545e3/Untitled%205.png)

# 기술 스택

---

`**Back-End**`

- Nest.js
- Node.js

`**Front-End**`

- TypeScript
- React
- Recoil
- Tailwindcss
- ChakraUI
- ESlint / Prettier

**`Infra`**

- Docker
- Docker Compose
- PostgreSQL

**`Collaboration`**

- Git
- Notion
- Slack

## 깃허브 레포지토리

---

- Front-End

[https://github.com/transcendence-42seoul/transcendence_front](https://github.com/transcendence-42seoul/transcendence_front)

- Back-End

[https://github.com/transcendence-42seoul/transcendence_back](https://github.com/transcendence-42seoul/transcendence_back)
