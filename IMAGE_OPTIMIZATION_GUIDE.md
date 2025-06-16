# SustainX 웹사이트 배경 이미지 최적화 가이드

## 🎯 최적화 완료 사항

### 1. HTML/CSS 개선사항
- ✅ 중요한 배경 이미지 프리로드 추가
- ✅ 향상된 레이지 로딩 시스템 구현
- ✅ 로딩 인디케이터 추가
- ✅ WebP 포맷 자동 감지 및 대체
- ✅ GPU 가속 및 성능 최적화

### 2. JavaScript 최적화
- ✅ Intersection Observer 기반 스마트 로딩
- ✅ WebP 지원 감지 및 폴백 처리
- ✅ 성능 모니터링 코드 추가
- ✅ 오류 처리 및 복구 로직

## 📊 현재 이미지 크기 분석

```
현재 배경 이미지 크기:
├── hero-bg.jpeg: 4.19MB ⚠️
├── diff-bg.jpeg: 5.81MB ⚠️
├── process-bg.jpeg: 3.14MB ⚠️
├── services-bg.jpeg: 3.97MB ⚠️
└── cta-bg.jpeg: 13.18MB 🚨 (매우 큼)

총 용량: ~30MB
권장 총 용량: 3-5MB (85% 압축 필요)
```

## 🚀 즉시 실행 가능한 최적화

### 1단계: 이미지 압축 (가장 중요!)

**온라인 도구 사용:**
1. [TinyJPG](https://tinyjpg.com/)에서 각 이미지 압축
2. [Squoosh](https://squoosh.app/)에서 WebP 변환

**목표 크기:**
- hero-bg.jpeg: 4.19MB → 500KB (88% 압축)
- diff-bg.jpeg: 5.81MB → 400KB (93% 압축)
- process-bg.jpeg: 3.14MB → 400KB (87% 압축)
- services-bg.jpeg: 3.97MB → 500KB (87% 압축)
- cta-bg.jpeg: 13.18MB → 500KB (96% 압축)

### 2단계: WebP 포맷 생성

각 JPEG 이미지마다 WebP 버전 생성:
```
images/section/hero/hero-bg.webp
images/section/diff/AdobeStock_1186836910.webp
images/section/process/AdobeStock_1338630829.webp
images/section/services/AdobeStock_1235752382.webp
images/section/cta/cta-bg.webp
```

## 💡 추가 최적화 권장사항

### 반응형 이미지 생성

**모바일용 (768px 너비):**
```
hero-bg-mobile.jpg (300KB)
hero-bg-mobile.webp (200KB)
```

**태블릿용 (1024px 너비):**
```
hero-bg-tablet.jpg (400KB)
hero-bg-tablet.webp (280KB)
```

**데스크톱용 (1920px 너비):**
```
hero-bg-desktop.jpg (500KB)
hero-bg-desktop.webp (350KB)
```

### HTML Picture 태그 구현 (선택사항)

```html
<!-- Hero 섹션 예시 -->
<section class="relative min-h-screen flex items-center">
    <picture class="absolute inset-0">
        <source media="(max-width: 768px)" 
                srcset="images/section/hero/hero-bg-mobile.webp" 
                type="image/webp">
        <source media="(max-width: 768px)" 
                srcset="images/section/hero/hero-bg-mobile.jpg">
        <source media="(max-width: 1024px)" 
                srcset="images/section/hero/hero-bg-tablet.webp" 
                type="image/webp">
        <source media="(max-width: 1024px)" 
                srcset="images/section/hero/hero-bg-tablet.jpg">
        <source srcset="images/section/hero/hero-bg.webp" 
                type="image/webp">
        <img src="images/section/hero/hero-bg.jpg" 
             alt="Hero Background"
             class="w-full h-full object-cover">
    </picture>
    <div class="absolute inset-0 bg-overlay"></div>
    <!-- 기존 콘텐츠 -->
</section>
```

## 📈 예상 성능 개선

### Before (현재)
- 총 이미지 용량: ~30MB
- 3G 네트워크: 60-90초 로딩
- LCP (Largest Contentful Paint): 5-10초
- Core Web Vitals: 불합격

### After (최적화 후)
- 총 이미지 용량: ~3-5MB (85% 절약)
- 3G 네트워크: 6-10초 로딩 (85% 개선)
- LCP: 1-3초 (70% 개선)
- Core Web Vitals: 합격 예상

## 🛠 실행 단계

### 즉시 실행 (30분)
1. cta-bg.jpeg (13.18MB) 압축 → 500KB
2. diff-bg.jpeg (5.81MB) 압축 → 400KB
3. hero-bg.jpeg (4.19MB) 압축 → 500KB

### 단기 실행 (2-3시간)
1. 모든 이미지 WebP 변환
2. 압축된 이미지로 교체
3. 성능 테스트 및 검증

### 장기 최적화 (1주일)
1. 반응형 이미지 생성
2. CDN 도입 검토
3. AVIF 포맷 테스트

## 🔧 도구 및 리소스

### 온라인 압축 도구
- **TinyJPG/TinyPNG**: https://tinyjpg.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

### 성능 측정 도구
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://webpagetest.org/

### 브라우저 개발자 도구
```javascript
// 콘솔에서 WebP 지원 확인
console.log('WebP 지원:', sustainX.webpSupported);

// 성능 메트릭 확인
performance.getEntriesByType('navigation')[0];
```

## ⚠️ 주의사항

1. **백업 필수**: 원본 이미지 백업 후 작업
2. **점진적 적용**: 한 번에 모든 이미지 교체하지 말고 단계적으로
3. **테스트 필수**: 다양한 기기와 브라우저에서 테스트
4. **모니터링**: 교체 후 로딩 시간 모니터링

## 📞 지원

최적화 과정에서 문제가 발생하면:
1. 브라우저 콘솔 오류 확인
2. 네트워크 탭에서 이미지 로딩 상태 확인
3. sustainX.webpSupported로 WebP 지원 확인
