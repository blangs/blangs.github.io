---
title:  "스프링 Mybatis 모델 DDD(1) DTO 직접 매핑 vs 엔티티 조립"
excerpt: "스프링 Mybatis 모델 DDD(1) DTO 직접 매핑 vs 엔티티 조립 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2025-08-10T13:17:00-17:00:00
---
  
  

## 개요
> ❗<span style='color:green'>***JAP사용 X***</span>  
> 💡 *<span style='color:blue'>**마이바티스 & Mapper 모델로 DDD 설계 기록**</span>  
  
  
  
## DTO 직접 매핑 방식
```java
@Service
public class AdCampaignService {
    private final AdCampaignMapper mapper;

    public AdCampaignService(AdCampaignMapper mapper) {
        this.mapper = mapper;
    }

    public List<AdCampaignListResponseDto> getCampaignList() {
        return mapper.selectAdCampaignListDto();
    }
}

```
  
> ❗<span style='color:green'>***특징***</span>  
> 💡 *<span style='color:blue'>**쿼리에서 바로 DTO로 매핑 → 빠르고 코드 양이 적음**</span>  
> 💡 *<span style='color:blue'>**단점: 조인 조건이나 컬럼 변경 시 쿼리를 직접 수정해야 함**</span>  
  
  
  
## 엔티티 조립 방식
```java
@Service
public class AdCampaignService {
    private final AdCampaignMapper campaignMapper;
    private final BckAffiliateMapper affiliateMapper;
    private final AdProductMapper productMapper;

    public AdCampaignService(AdCampaignMapper campaignMapper, BckAffiliateMapper affiliateMapper, AdProductMapper productMapper) {
        this.campaignMapper = campaignMapper;
        this.affiliateMapper = affiliateMapper;
        this.productMapper = productMapper;
    }

    public AdCampaignListResponseDto getAdCampaignList(String adCampNo) {
        AdCampaign campaign = campaignMapper.selectAdCampaignById(adCampNo);
        BckAffiliate affiliate = affiliateMapper.selectBckAffiliateByAdCampNo(adCampNo);
        AdProduct product = productMapper.selectAdProductByAdCampNo(adCampNo);

        return toListDto(campaign, affiliate, product);
    }

    private AdCampaignListResponseDto toListDto(AdCampaign c, BckAffiliate a, AdProduct p) {
        AdCampaignListResponseDto dto = new AdCampaignListResponseDto();
        dto.setAdCampNo(c.getAdCampNo());
        dto.setMktEvtNm(c.getMktEvtNm());
        dto.setBckAfltCoNm(a.getBckAfltCoNm());
        dto.setAdvrPdNm(p.getAdvrPdNm());
        return dto;
    }
}

```
  
> ❗<span style='color:green'>***특징***</span>  
> 💡 *<span style='color:blue'>**여러 DB 호출 + 서비스 계층에서 DTO 조립 → 유연하게 가공 가능**</span>  
> 💡 *<span style='color:blue'>**단점: 호출 횟수가 많아지면 성능 튜닝 필요**</span>  
  
  
  
## 실제 “엔티티 조립 방식”의 장점은 뭘까?  
### 1. 복잡한 비즈니스 로직 적용이 용이  
> ❗<span style='color:green'>***DB 쿼리로 처리할 수 없는 복잡한 연산(예: 다양한 규칙 조합, 외부 API 호출 결과 합산, 실시간 계산 등)을 Java 코드에서 자유롭게 할 수 있음.***</span>  
> ❗<span style='color:green'>***예시***</span>  
> 💡 *<span style='color:blue'>**여러 엔티티 값을 조합 후, 전용 규칙으로 계산된 필드 세팅 가능**</span>  
> 💡 *<span style='color:blue'>**값 검증, 상태변경, 권한처리, 이벤트 발생 등 "DB에서 못하는 일"을 서비스 계층에서 실행**</span>  
   
  
### 2. 도메인 독립성과 확장성  
> ❗<span style='color:green'>***DB 구조와 응답 형태가 1:1로 따라가지 않아도 됨. 즉, DB 컬럼 변경이 있어도 엔티티-DTO 변환만 고치면 서비스/컨트롤러/프론트는 영향이 최소화(의존성 낮음).***</span>  
> ❗<span style='color:green'>***새로운 비즈니스 요구가 들어오면 엔티티에 기능 추가 + DTO에 필드/로직 확장으로 유연 대응.***</span>  
   
  
### 3. 테스트 편의성  
> ❗<span style='color:green'>***각각의 엔티티를 Mock 객체 등으로 만들어 "비즈니스 로직 단위 테스트"가 쉬움 DB, 쿼리 없이도 서비스 계층에서 조립·검증 가능***</span>  
   
  
### 4. 다른 출처의 데이터 유연 조합 가능
> ❗<span style='color:green'>***DB뿐 아니라 외부 API, 파일, 캐시, 등 다양한 데이터 소스와 엔티티를 조합할 수 있음.***</span>  
> ❗<span style='color:green'>***예시***</span>  
> 💡 *<span style='color:blue'>**한 API 응답에 DB+외부 시스템 정보+계산값을 섞어서 보내야 할 때 마땅히 이 방식 필요.**</span>  
  
  
### 5. DB 결합도↓, 유지보수↑  
> ❗<span style='color:green'>***DB 쿼리가 바뀌거나 다른 DB로 이전해도 비즈니스 로직 대부분은 서비스 계층에서 보존 가능,쿼리는 최소한으로만 변경해서 정합성을 유지.***</span>  
  
  
  
##  “엔티티 조립 방식”이 반드시 필요한 상황은 뭘까?
> ❗<span style='color:green'>***여러 출처 데이터 “조합” 필요: DB 1, DB 2, 외부 API 등***</span>  
> ❗<span style='color:green'>***필드 값 “가공” 필요: 단순 SELECT로 해결불가. 예) 복합 계산, 상태 결정, 조건 분기 처리***</span>  
> ❗<span style='color:green'>***응답 포맷 변화 권장: 프론트/타 시스템 요구에 따라 DTO 형태 관리***</span>  
> ❗<span style='color:green'>***도메인 로직을 자바 코드로 관리: 정책 변경, 이벤트 트리거링 등***</span>  
  
  
  
##  “직접 DB 조회 방식”이 더 나은 상황은 뭘까?
> ❗<span style='color:green'>***단순 조회/조회 화면 (그냥 SELECT → DTO로 내보내면 끝)***</span>  
> ❗<span style='color:green'>***성능 최우선 상황***</span>  
> 💡 *<span style='color:blue'>**비즈니스 로직이 극히 단순하거나 필요 없는 경우**</span>  
  
  
  
## 코드 예시로 보는 차이
### [직접 매핑 방식]
- DB가 바뀌면 쿼리/매퍼 전부 수정,
- 서비스 레이어 역할이 “퍼다주기”로 끝남
  
  
### [엔티티 조립 방식]
- ① 서비스가 여러 엔티티/데이터 조회
- ② 복합 가공
- ③ DTO 생성
- 비즈니스 로직 및 관리가 서비스에서 깔끔하게 분리됨 (테스트/협업/확장성이 높아짐)
  
  
### 실무 TIP
대부분의 “간단 목록 조회”는 DTO 직접 매핑으로 처리해서 퍼포먼스를 챙깁니다.  
하지만 “상세조회, 복잡 응답, 다양한 소스 조합, 로직 분기”는 반드시 엔티티 조립 방식을 써야 유지보수성이 올라가고, 변화에 강한 구조가 됩니다.  
두 방식은 혼합해서 써도 되고, “팀 컨벤션”에 따라 적절히 선택하는 게 가장 베스트입니다.  
  
  
  
## 결론
단순조회는 직접 매핑, 복잡 응답/가공/조합/확장성은 엔티티 조립 이유 없이 복잡하게 쓸 필요는 없고, 장기 프로젝트라면 구조의 유연성을 챙겨야 합니다.  

```bash 
정리하면,  
다중 조인 조회 시 DTO로 바로 매핑해서 리턴하는 게 훨씬 안전하고 성능적으로도 유리합니다.
지금 태호님 케이스도 toListDto(...)에서 엔티티 조립하는 방식보다는,
쿼리에서 DTO 구조에 맞게 바로 매핑하는 방식이 더 깔끔합니다.

언제 DTO를 바로 리턴하는 게 허용될까요?
읽기 전용 쿼리, 복잡한 조인 결과를 바로 받아야 할 때
다중 테이블 조인 후에 바로 DTO 형태로 결과를 받으면
불필요한 엔티티 객체 생성이나 변환 과정이 줄어들어 성능상 이점이 있습니다.
응답용 데이터가 단순 조회용이고, 변경 작업과 무관한 경우
조회 전용 서비스나 API라면, 엔티티 대신 DTO를 직접 리턴해도 무방합니다.
엔티티를 노출하지 않음으로써 보안/캡슐화 측면에서도 좋을 수 있습니다.
계층 간 역할이 명확하게 분리된 경우
Repository(MyBatis Mapper 등)에서 DTO를 바로 받아
서비스에서는 가공 없이 그대로 리턴하는 구조라면 허용됩니다.
복잡한 엔티티 조합을 재조립하지 않아도 될 때
여러 테이블 데이터를 DTO에 한 번에 매핑하는 쿼리 결과라면
따로 엔티티 변환 로직을 거치지 않아도 되므로 간편합니다.
```