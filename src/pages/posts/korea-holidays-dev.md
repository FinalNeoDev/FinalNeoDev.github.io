---
layout: ../../layouts/MarkdownLayout.astro
title: "대한민국 공휴일 & 대체공휴일 안내 웹 서비스 개발기"
description: "공공데이터 특일 정보 연동과 대체공휴일 자동 판별 알고리즘, 반응형 캘린더 UX 구축"
category: "Web Development"
date: "2026-08-20"
readTime: "5분 읽기"
pageHeader:
  title: "대한민국 공휴일 & 대체공휴일 안내 웹 서비스 개발기"
  subtitle: "공공데이터 특일 정보 연동과 대체공휴일 자동 판별 알고리즘, 반응형 캘린더 UX 구축"
  bgType: "bordered"
---

## 1. 프로젝트 기획 배경

대한민국의 공휴일 제도는 '관공서의 공휴일에 관한 규정' 개정에 따라 대체공휴일 적용 범위가 지속적으로 확대되어 왔습니다. 설날·추석, 어린이날뿐만 아니라 3·1절, 광복절, 개천절, 한글날, 부처님오신날, 기독탄신일(크리스마스) 등 대부분의 공휴일에 대체공휴일이 도입되었습니다.

하지만 일반 사용자 입장에서:
- 다가오는 공휴일이 주말과 겹쳤을 때 대체공휴일이 발생하는지
- 월별·연도별 황금연휴 일정이 어떻게 구성되는지
- 다음 휴일까지 정확히 며칠(D-Day) 남았는지

이를 한눈에 직관적으로 확인할 수 있는 가볍고 빠른 웹 서비스의 필요성을 느껴 **Korea Holidays** 프로젝트를 시작하게 되었습니다.

---

## 2. 핵심 아키텍처 및 데이터 파이프라인

### 2.1 공공데이터 특일 정보 활용 및 캐싱
한국천문연구원 및 행정안전부가 제공하는 특일 정보 공공 API를 바탕으로 연도별 법정 공휴일 데이터를 정제했습니다. 네트워크 의존성을 낮추고 반응 속도를 100ms 이내로 단축하기 위해:
1. 연도별 특일 데이터셋 사전 컴파일(Pre-compiled JSON)
2. 음력 기반 명절(설날, 추석, 부처님오신날)의 양력 환산 테이블 검증
3. 클라이언트 로컬스토리지 및 인메모리 캐싱 적용

### 2.2 대체공휴일 자동 판별 알고리즘
대체공휴일 산정 원칙은 다음과 같은 규칙 엔진을 따릅니다:
- **일요일 또는 토요일 겹침 여부**: 공휴일이 토요일·일요일 또는 다른 공휴일과 겹치는 경우, 첫 번째 비공휴일을 대체공휴일로 지정
- **예외 규정 처리**: 신정(1월 1일), 현충일(6월 6일) 등 법적으로 대체공휴일이 미적용되는 특일의 예외 분기 처리

```javascript
// 대체공휴일 적용 핵심 판별 로직 예시
function calculateSubstituteHolidays(holidayList, year) {
  const result = [...holidayList];
  holidayList.forEach(holiday => {
    if (!holiday.isSubstituteEligible) return;
    
    const dayOfWeek = new Date(holiday.date).getDay();
    // 일요일(0) 또는 토요일(6)과 겹칠 경우 다음 첫 번째 평일 탐색
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      let nextDay = getNextDate(holiday.date);
      while (isHolidayOrWeekend(nextDay, result)) {
        nextDay = getNextDate(nextDay);
      }
      result.push({
        date: nextDay,
        name: `대체공휴일 (${holiday.name})`,
        isSubstitute: true
      });
    }
  });
  return result;
}
```

---

## 3. 사용자 경험(UX) 최적화

1. **캘린더 뷰와 리스트 뷰의 하이브리드 지원**: 데스크톱에서는 한눈에 월별 흐름을 보는 캘린더 그리드를 제공하고, 모바일에서는 스크롤 한 번으로 다가오는 공휴일을 확인할 수 있는 세로 리스트를 기본 제공합니다.
2. **D-Day 카운트다운**: 오늘 날짜를 기준으로 가장 가까운 다음 공휴일까지 남은 일수를 상단 하이라이트 카드로 노출하여 직관성을 극대화했습니다.
3. **황금연휴 시뮬레이터**: 징검다리 휴일 사이에 연차 1~2일을 사용했을 때 최장 연속 휴식일을 계산해주는 편의 기능을 탑재했습니다.

---

## 4. 성과 및 바로가기

Korea Holidays는 별도의 무거운 외부 라이브러리 없이 순수 웹 표준 기술을 사용하여 첫 페이지 로드 시간을 0.4초 이하로 유지하고 있습니다.

👉 **라이브 서비스 체험하기**: [https://0bit.kr/Korea_Holidays/](https://0bit.kr/Korea_Holidays/)
