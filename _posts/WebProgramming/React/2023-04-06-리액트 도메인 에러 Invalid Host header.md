---
title:  "리액트 도메인 에러 Invalid Host Header"
excerpt: "리액트 도메인 에러 Invalid Host Header 입니다."

categories:
  - react
tags:
  - [react]

toc: true
toc_sticky: true

last_modified_at: 2023-04-05T20:00:00-05:00
---

## 리액트 Invalid host header 오류 발생시
> 💡 yarn, npm 등의 패키지매니저로 API를 설치하면 설정이 초기화 되는 느낌이든다.    
> 💡 우선 조치 방법부터 기록한다.


### webpackDevServer.config.js

```bash
cd /reactSymbolic/node_modules/react-scripts/config
vi webpackDevServer.config.js

```

```js
// AS-IS
module.exports = function (proxy, allowedHost) {

const disableFirewall = 
!proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';

```

```js
// TO-BE
module.exports = function (proxy, allowedHost) {

//아래와 같이 변경
const disableFirewall = true;
// !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';

```

> ❗<span style="color:green"><b>***내용***</b></span>  
> 💡 리액트의 webpackDevServer.config.js 파일에서 const disableFirewall = true;는 "Webpack Dev Server"에서 방화벽을 비활성화하는 옵션이다.  
> 💡 Webpack Dev Server는 개발 중에 웹 애플리케이션을 테스트하기 위해 사용되는 개발 서버이다. 이 서버는 웹팩으로 빌드한 애플리케이션을 호스팅하고, 변경 사항을 자동으로 감지하여 페이지를 새로 고침 없이 실시간으로 반영해주는 기능을 제공 한다.  
> 💡 하지만 때로는 개발 환경에서 방화벽이나 보안 정책 때문에 웹팩 개발 서버의 기능이 제대로 동작하지 않을 수 있다. 이런 경우, disableFirewall 옵션을 true로 설정하면 웹팩 개발 서버가 방화벽을 우회하여 로컬 호스트(localhost)에서 실행 중인 애플리케이션에 접근할 수 있도록 한다.  
> 
> ❗<span style="color:green"><b>***결론***</b></span>  
> 💡 이와 같이 disableFirewall 변수를 true로 설정하면, 웹팩 개발 서버가 방화벽을 우회하여 호스트로부터의 접근을 허용하게 된다.  
> 💡 주의할 점은 이 옵션은 개발 환경에서만 사용해야 하며, 실제 배포 환경에서는 비활성화해야 한다.  
> 💡 방화벽 비활성화는 보안상의 이슈를 야기할 수 있으므로 신중하게 사용해야 한다.  
