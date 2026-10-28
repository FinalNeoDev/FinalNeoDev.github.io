---
layout: ../../layouts/MarkdownLayout.astro
title: "저작권 안심 OFL 오픈 폰트 큐레이션 및 실시간 타이핑 뷰어 제작기"
description: "상업적 무료 폰트 라이선스 검증과 WOFF2 웹폰트 동적 로딩 성능 최적화"
category: "Web Typography"
date: "2026-09-22"
readTime: "5분 읽기"
pageHeader:
  title: "저작권 안심 OFL 오픈 폰트 큐레이션 및 실시간 타이핑 뷰어 제작기"
  subtitle: "상업적 무료 폰트 라이선스 검증과 WOFF2 웹폰트 동적 로딩 성능 최적화"
  bgType: "bordered"
---

## 1. 오픈 폰트 라이선스(OFL)와 폰트 저작권

유튜브 썸네일, 인쇄물, 로고, 웹사이트 개발 등 다양한 분야에서 폰트 사용에 따른 저작권 침해 분쟁이 빈번하게 발생합니다. "무료 폰트"라고 명시되어 있어도:
- 개인 비상업적 용도로만 무료인 경우
- 인쇄물에는 무료이나 웹폰트 임베딩이나 영상 임베딩은 금지된 경우
- 유료 서체 번들 프로그램의 무단 복제로 법적 분쟁에 휘말리는 경우

이를 방지하기 위해 한국교육학술정보원(KERIS)과 문화체육관광부는 SIL 오픈 폰트 라이선스(OFL) 등을 기반으로 **상업적 이용이 전면 허용된 안심 글꼴**을 공식 지정해 배포하고 있습니다. **Korea Font**는 이 안심 글꼴들을 웹상에서 바로 테스트하고 시각적으로 비교할 수 있는 도구입니다.

---

## 2. 웹 폰트 최적화 기술

수십 가지의 한글 폰트를 웹에서 한꺼번에 로딩하면 수십 메가바이트(MB)의 트래픽이 발생하여 브라우저가 멈출 수 있습니다. 이를 해결하기 위해 다음과 같은 최적화 기법을 도입했습니다:

### 2.1 WOFF2 포맷 및 서브셋 폰트(Subsetting)
한글 11,172자를 모두 포함한 TTF 파일은 개당 5~10MB에 달합니다. 국가 표준 완성형 한글 2,350자와 필수 영문/기호만 추출한 서브셋 폰트를 구축하고, 최신 압축 포맷인 **WOFF2**로 변환하여 폰트당 용량을 200~400KB 수준으로 90% 이상 경량화했습니다.

### 2.2 온디맨드 동적 폰트 패칭 (Font-Face Dynamic Injection)
모든 폰트를 초기에 로드하지 않고, 사용자의 화면 뷰포트에 폰트 카드가 진입할 때(IntersectionObserver) 동적으로 `@font-face`를 CSSOM에 주입합니다.

```javascript
const fontObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fontName = entry.target.dataset.fontName;
      const fontUrl = entry.target.dataset.fontUrl;
      
      const font = new FontFace(fontName, `url(${fontUrl})`, { display: 'swap' });
      font.load().then(loadedFont => {
        document.fonts.add(loadedFont);
        entry.target.classList.add('font-loaded');
      });
      
      fontObserver.unobserve(entry.target);
    }
  });
});
```

---

## 3. 실시간 인터랙티브 타이핑 경험

사용자가 상단 입력창에 글자를 입력하면, 화면에 표시된 모든 글꼴 미리보기 카드가 지연 없이 실시간으로 텍스트를 반영합니다.
- 글자 크기(Font Size), 자간(Letter Spacing), 줄간격(Line Height) 실시간 조절 슬라이더
- 다크모드 및 배경색 대비 테스트 지원
- 해당 글꼴의 공식 라이선스 문서 및 제작사 다운로드 링크 직결

👉 **안심 글꼴 뷰어 바로가기**: [https://0bit.kr/KERIS_OFL_fonts/](https://0bit.kr/KERIS_OFL_fonts/)
