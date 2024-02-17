---
title: "환경 Eclips 주석설정(무너지지 않게)"
excerpt: "환경 Eclips 주석설정(무너지지 않게) 입니다."

categories:
  - environment
tags:
  - [init, environment]
toc: true
toc-stiky: true
last_modified_at: 2023-09-31T09:00:00-18:00:00
---

## 개요


## 반영
> ❗<span style='color:green'>***커스텀 설정***</span>  
> 💡 STEP1. <span style='color:blue'>**Server > Server Options > Serve modules without publishing 체크**</span>  
> > ![사진1](/assets/images/Temp/Environment/eclips-easy-publishing1.jpg)
>  
> 💡 STEP2. <span style='color:blue'>**끝**</span>  

## 설명
> ❗<span style='color:green'>***이제부터 이클립스에서 저장하면 바로 반영된다.***</span>  
> 💡 <span style='color:blue'>**\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\ 경로에는 ROOT만 덩그라니 남는다.**</span>  
>  
> 💡 <span style='color:blue'>**tmp0, tmp1, tmp2, .. 이러한 서버 세팅이 n개 일때 생성되는 파일도 삭제해도 된다.**</span>  
>  
> 💡 <span style='color:blue'>**이렇게 하면 하드디스크나 SSD 공간도 좀더 적게 사용하게 되고,불필요한 작업도 줄어든다.**</span>  
>  
> ❗<span style='color:green'>***하지만 class 파일은 안된다.***</span>  
> 💡 <span style='color:blue'>**.css .js .jsp(안에 기술된 java 코드) 등은 체크되어 있을 때 퍼블을 하지 않고 SVN 와 연계되는 파일을 그대로 반영하지만,.class 파일은 안된다.</span>  
  
  
뷰가 무거워질수록 로컬테스트가 힘들다.. 그래서 나는 설정했다..  
{: .notice--info}