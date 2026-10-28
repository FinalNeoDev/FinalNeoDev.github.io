---
layout: ../../layouts/MarkdownLayout.astro
title: "Astro 정적 사이트 제너레이터(SSG)와 GitHub Pages 기반 SEO 및 애드센스 최적화"
description: "커스텀 도메인(0bit.kr) 환경에서의 Canonical 태그 일치화, 사이트맵 자동화, 가교 페이지(Bridge Page) 탈피 전략"
category: "Architecture & SEO"
date: "2026-10-28"
readTime: "7분 읽기"
pageHeader:
  title: "Astro 정적 사이트 제너레이터(SSG)와 GitHub Pages 기반 SEO 및 애드센스 최적화"
  subtitle: "커스텀 도메인(0bit.kr) 환경에서의 Canonical 태그 일치화, 사이트맵 자동화, 가교 페이지(Bridge Page) 탈피 전략"
  bgType: "bordered"
---

## 1. 문제의 발단: 애드센스 승인 거절과 가교 페이지(Bridge Page) 이슈

웹 서비스와 개인 포트폴리오를 홍보하기 위해 GitHub Pages로 제작한 사이트를 커스텀 도메인(0bit.kr)에 연결했을 때, 구글 애드센스 검토에서 **"콘텐츠 없음(Thin Content)"** 또는 **"가치 있는 인벤토리 부족"**으로 거절당하는 경우가 많습니다.

원인을 분석해 보면 핵심 원인은 세 가지였습니다:

1. **잘못된 Canonical 태그**: Astro 설정(`site` 옵션)이 이전 주소인 `finalneodev.github.io`로 남아 있어, 검색 로봇이 `0bit.kr`을 독립 사이트가 아닌 미러(복제본) 사이트로 인식
2. **도메인 불일치 외부 링크**: 사이트 내부 링크들이 모두 `finalneodev.github.io`로 빠져나가 `0bit.kr`이 단순 관문 역할만 하는 **가교 페이지(Bridge Page)**로 분류
3. **독립된 텍스트 콘텐츠의 부재**: 단일 화면에 링크 버튼만 나열되어 크롤러가 색인할 만한 텍스트 콘텐츠가 부족

---

## 2. 해결책 1: Astro 설정과 Canonical URL 일치화

Astro 프레임워크는 `astro.config.mjs`의 `site` 속성을 기반으로 모든 페이지의 `Astro.site`, `Astro.url`, 그리고 `@astrojs/sitemap`의 XML 주소를 결정합니다.

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  compressHTML: true,
  // 반드시 실제 서비스 커스텀 도메인으로 지정
  site: 'https://0bit.kr',
  integrations: [sitemap()],
  // ...
})
```

이 수정을 통해:
- 모든 HTML `<head>`에 `<link rel="canonical" href="https://0bit.kr/...">`가 올바르게 주입됩니다.
- OpenGraph 태그(`og:url`, `og:image`) 또한 `https://0bit.kr` 도메인으로 통일됩니다.
- `sitemap-0.xml`에 기재되는 모든 페이지 링크가 커스텀 도메인으로 출력됩니다.

---

## 3. 해결책 2: 동일 도메인 내부 경로로 링크 통일

GitHub Pages에 커스텀 도메인을 설정하면, 계정 하위의 리포지토리 프로젝트들도 동일 도메인의 서브패스로 접근할 수 있습니다.
- 기존: `https://finalneodev.github.io/Korea_Holidays/`
- 개선: `https://0bit.kr/Korea_Holidays/`

네비게이션 바, 메인 카드, 사이트맵, 푸터의 모든 프로젝트 링크를 동일 도메인으로 통일함으로써 크롤러가 도메인 내부를 탐색하도록 구조를 개선했습니다.

---

## 4. 해결책 3: 지속 가능한 독립 Posts(기술 블로그) 구조 구축

구글 검색 로봇과 애드센스 크롤러가 가장 신뢰하는 것은 **"독창적이고 유용한 오리지널 텍스트 콘텐츠"**입니다.
상단 네비게이션에 **Posts** 메뉴를 신설하고, 제작한 각 웹 서비스의 기획 의도, 기술적 난제 해결 과정, 법률·수학적 알고리즘을 상세한 아티클로 구성하여 사이트 내에 정적 페이지로 발행했습니다.

이로써 0bit.kr은 단순한 프로젝트 링크 모음집에서 벗어나, **개발 철학과 기술적 지식을 축적하는 정통 기술 쇼케이스 & 블로그**로 발돋움하게 되었습니다.
