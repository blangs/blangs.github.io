---
title: "환경 VSCODE CSS 속성 정렬 PostCSS Sorting 플러그인"
excerpt: "울트라에디트환경 VSCODE CSS 속성 정렬 PostCSS Sorting 플러그인 입니다."

categories:
  - environment
tags:
  - [init, environment]
toc: true
toc-stiky: true
last_modified_at: 2025-05-09T16:00:00-16:30:00
---

## 개요
나름 표준화된 CSS 컨벤션을 정의하고 정렬을 수행하려고 한다.

## 표준
1. 레이아웃(박스 모델)
    * → display, position, top/right/bottom/left, z-index, flex 속성 등

2. 박스 사이즈
    * → width, height, padding, margin

3. 테두리/배경
    * → border, background, box-shadow

4. 텍스트/폰트
    * → color, font, text-align, line-height, white-space 등

5. 기타 시각적 효과
    * → opacity, transition, transform 등


## 구현
### STEP1. 설치
> ❗<span style='color:green'>VSCode 실행 > 검색 > 설치</span>  
> 💡 <span style='color:red'>**[ctrl + shift + x] : Extensions(확장 프로그램)에서 PostCSS Sorting 검색 및 설치**</span>  
  
### STEP2. Settings.json
> ❗<span style='color:green'>Settings.json 파일열기</span>  
> 💡 <span style='color:red'>**설치 후 PostCSS Sorting 의 톱니 설정 아이콘 > Settings > Edit in settings.json 클릭**</span>  
> 💡 <span style='color:red'>**VSCODE의 설정파일에 해당 플러그인관련된 내용이 삽입된채로 OPEN 된다.**</span>    
>   
> ❗<span style='color:green'>Settings.json 파일작성</span>  
> >    ```css
> >    "postcssSorting.config": {
> >      "order": [
> >        "custom-properties",
> >        "dollar-variables",
> >        "declarations",
> >        "at-rules",
> >        "rules"
> >      ],
> >      "properties-order": [
> >        // 레이아웃(박스 모델)
> >        "display",
> >        "position",
> >        "top",
> >        "right",
> >        "bottom",
> >        "left",
> >        "z-index",
> >        "flex",
> >        "flex-direction",
> >        "flex-wrap",
> >        "flex-grow",
> >        "flex-shrink",
> >        "flex-basis",
> >        "justify-content",
> >        "align-items",
> >        "align-self",
> >        "order",
> >    
> >        // 박스 사이즈
> >        "width",
> >        "height",
> >        "min-width",
> >        "max-width",
> >        "min-height",
> >        "max-height",
> >        "padding",
> >        "margin",
> >        "box-sizing",
> >    
> >        // 테두리/배경
> >        "border",
> >        "border-width",
> >        "border-style",
> >        "border-color",
> >        "border-radius",
> >        "background",
> >        "background-color",
> >        "background-image",
> >        "background-size",
> >        "background-position",
> >        "background-repeat",
> >        "box-shadow",
> >    
> >        // 텍스트/폰트
> >        "color",
> >        "font-family",
> >        "font-size",
> >        "font-weight",
> >        "font-style",
> >        "line-height",
> >        "text-align",
> >        "text-transform",
> >        "text-decoration",
> >        "letter-spacing",
> >        "white-space",
> >        "word-wrap",
> >        "word-break",
> >        "overflow-wrap",
> >        "visibility",
> >    
> >        // 기타 시각적 효과
> >        "opacity",
> >        "transition",
> >        "transform",
> >        "box-shadow",
> >        "filter",
> >        "clip-path",
> >        "outline",
> >        "resize"
> >      ]
> >    }
> >    ```


### STEP3. 단축키 지정
> 💡 <span style='color:red'>**1. 컨트롤 + 쉬프트 + p**</span>  
> 💡 <span style='color:red'>**2. PostCssSorting 을 입력 후 하단에 출력되는 검색창에서 톱니바퀴 아이콘을 클릭.**</span>    
> 💡 <span style='color:red'>**3. 키맵핑 부분에  원하는 단축키를 입력한다**</span>   
  
***중복되는 단축키가 있으면 아래에 알려주니 겹치지 않도록 만들 것.***  
{: .notice--info}