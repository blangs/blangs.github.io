---
title: "환경 VisualCode 코드정렬 설정"
excerpt: "환경 VisualCode 코드정렬 설정 입니다."

categories:
  - environment
tags:
  - [init, environment]
toc: true
toc-stiky: true
last_modified_at: 2022-12-03T13:00:00-05:00
---

## 개요

VS Code 들여쓰기 자동맞춤 Prettier | 코드 포매터

## 1. Prettier - Code Formatter

1. Prettier 설치
2. 루트/.prettierrc 생성

    ```json
    {
    "singleQuote": true, //큰따옴표 대신 작은 따옴표로
    "semi":true, //세미콜론 항상 붙이기
    "useTabs": false, //탭 대신 공백으로 들여쓰기
    "tabWidth": 4 // 공백은 네 칸씩
    }
    ```
3. 사용법 알아서 찾기
    - 저장시 자동 정렬
    - shift + alt + F 수동으로 정렬


가독성을 위해 들여쓰기가 제대로 안 된 경우 한번에 맞춰주는 포매터.

```
{
    "singleQuote": true, //큰따옴표 대신 작은 따옴표로
    "semi":true, //세미콜론 항상 붙이기
    "useTabs": false, //탭 대신 공백으로 들여쓰기
    "tabWidth": 2 // 공백은 두 칸씩
}

```

- 기타) VS Code 에서 저장할 때마다 자동으로 코드 포맷 정리하는 기능
  - File > Preferences > Settings
    - 상단 텍스트 박스에 format on save 검색
    - 바로 아래 나오는 체크 박스에 체크 (Editor: Format On save 체크박스)
    - 완료
