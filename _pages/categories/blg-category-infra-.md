---
title: "인프라"
layout: archive
permalink: /categories/infra/
sidebar_main: true
author_profile: true
---
{% assign posts = site.categories.infra %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}

## 인프라 카테고리 페이지
인프라 아키텍처 포스트를 모은 카테고리 page 입니다.    
> 레이아웃은 `archive` 입니다.  
> `categories`,`tags`  같은 방식의 레이아웃 입니다.
>  같은 카테고리의 글들을 나열하는 아카이브로 
>  쓸 것이기 때문에 설정했습니다.

인프라 페이지지만 아키텍처도 다루겠습니다. 
{: .notice--info}

<!-- 헤더에 각주1 --> 
### 인프라<sup>[1](#인프라노트)</sup>
생활을 지탱하는 바탕이나 토대이다.

___

<!-- 헤더에 각주2 --> 
### 아키텍처<sup>[2](#아키텍처노트)</sup>
인터넷 검색 시스템이나 항공 회사 티켓 발권 시스템,  
편의점의 계산대 등 모두가 이용 방법이나 사용자가  
다르지만 IT 인프라 위에서 동작하고 있다.


<!-- 각주에 대한 주석 --> 
<a name="인프라노트">인프라</a>: 기반  
<a name="아키텍처노트">아키텍처</a>: 구조
