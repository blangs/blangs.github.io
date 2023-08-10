---
title:  "자바 Xml to Json"
excerpt: "자바 Xml to Json 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2023-08-08T09:00:00-18:00:00
---

## XML TO JSON (AND CUSTOM OBJECT)
> ❗***스프링에서 일반적인 방법(이슈)***  
> 💡 jackson(jackson-dataformat-xml) 사용  
> 💡 xml을 json으로 변환할 때 xml의 multiple child 값들이 다 사라지면서 단일 값이 남는 문제가 존재  
>  
> ❗***해결방법***  
> 💡 jackson(jackson-dataformat-xml) + org.json 사용  
> 💡 jackson 라이브러리와 org.json 라이브러리를 섞어 사용한다.  
> - 이렇게 하니까 Json 값이 나오게 되며 Object에 값들이 들어가게 된다.  
> - 여기서 커스텀 된 오브젝트를 사용하고 싶다면 Object 자리에 xml -> json으로 컨버터된 custom object를 넣어주면 된다.  
> - 그러면 필요한 xml을 custom obeject안에 담을 수 있게 된다.  

### STEP1. 필요 라이브러리
```bash
json-20180130.jar;
jackson.databind-2.9.9.1.jar

```

### STEP2. 구현
```java
import org.apache.commons.io.IOUtils;
import org.json.JSONObject;
import org.json.XML;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
...
try (InputStream inputStream = new FileInputStream(new File(
                "source.xml"))) {
    String xml = IOUtils.toString(inputStream);
    JSONObject jObject = XML.toJSONObject(xml);
    ObjectMapper mapper = new ObjectMapper();
    mapper.enable(SerializationFeature.INDENT_OUTPUT);
    Object json = mapper.readValue(jObject.toString(), Object.class);
    String output = mapper.writeValueAsString(json);
    System.out.println(output);
}
...

```