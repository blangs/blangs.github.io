---
title: " Kubernetes"
layout: archive
permalink: /categories/kubernetes/
sidebar_main: true
author_profile: true
---

Kubernetes(k8s) 카테고리의 포스트를 모은 [page] 입니다.    
> 레이아웃은 `archive` 입니다.  
> `categories`,`tags`  같은 방식의 레이아웃 입니다.
>  같은 카테고리의 글들을 나열하는 아카이브로 
>  쓸 것이기 때문에 설정했습니다.

카테고리를 가진 포스트들만 모아서 한번에  
보여줄 수 있는 위 사진같은 페이지를 만든다.  
{: .notice--info}

{% assign posts = site.categories.kubernetes %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
