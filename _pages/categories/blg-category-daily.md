---
title: "일상"
layout: category
permalink: /categories/daily/
sidebar_main: true
author_profile: true
---
개인적인 일상 포스트를 모은 카테고리 [page] 입니다.    
> 레이아웃은 `category` 입니다.  
> `categories` 레이아웃과는 다르게  
> 특정카테고리만 모아서 보여줍니다. 

{% assign posts = site.categories.daily %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
