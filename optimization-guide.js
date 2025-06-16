// =============================================================================
// SustainX 웹사이트 배경 이미지 최적화 가이드 (계속)
// =============================================================================

/* 구현 단계 */

단계 1: 즉시 실행 (이미지 압축)
- cta-bg.jpeg를 TinyJPG로 압축 (13.18MB → 500KB)
- 다른 큰 이미지들도 압축
- 목표: 전체 용량 30MB → 3-5MB

단계 2: HTML/CSS 개선
- 반응형 이미지 구현
- WebP 포맷 추가
- 레이지 로딩 개선

단계 3: 성능 모니터링
- Core Web Vitals 측정
- 로딩 시간 개선 확인

/* 성능 영향 예측 */

현재 상황:
- 첫 로딩: ~30MB 다운로드
- 모바일 3G: 60-90초 로딩 시간
- LCP (Largest Contentful Paint): 5-10초

최적화 후:
- 첫 로딩: ~3-5MB 다운로드
- 모바일 3G: 6-10초 로딩 시간
- LCP: 1-3초

개선 효과:
- 85-90% 용량 절약
- 80-85% 로딩 시간 단축
- 사용자 경험 대폭 개선

/* 모니터링 도구 */

1. Google PageSpeed Insights
   - Core Web Vitals 측정
   - 구체적인 개선 제안

2. GTmetrix
   - 상세한 성능 분석
   - 이미지별 최적화 제안

3. WebPageTest
   - 실제 네트워크 환경 테스트
   - 단계별 로딩 분석

/* 예상 ROI */

비용:
- 이미지 최적화: 2-4시간 작업
- 코드 수정: 2-3시간 작업
- 총 작업 시간: 반나절

효과:
- 바운스율 20-30% 감소
- 페이지 체류 시간 40-60% 증가
- 모바일 사용자 만족도 대폭 개선
- SEO 점수 향상

/* 장기적 최적화 전략 */

1. CDN 도입
   - 전 세계 빠른 이미지 배포
   - 자동 포맷 최적화

2. 차세대 포맷 사용
   - AVIF (Chrome, Firefox 지원)
   - WebP 대비 20-30% 추가 절약

3. 동적 이미지 크기 조정
   - 디바이스별 최적 크기 자동 선택
   - 실시간 압축률 조정

/* 즉시 적용 가능한 코드 개선 */

1. CSS 압축 클래스 추가:
```css
.bg-compressed {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    will-change: transform;
    image-rendering: optimizeQuality;
}
```

2. 이미지 프리로딩 개선:
```html
<link rel="preload" as="image" href="images/optimized/hero-bg-mobile.webp" 
      media="(max-width: 768px)">
<link rel="preload" as="image" href="images/optimized/hero-bg.webp" 
      media="(min-width: 769px)">
```

3. 레이지 로딩 개선:
```javascript
// 더 정교한 레이지 로딩
const bgImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const bgImage = element.dataset.bg;
            
            // WebP 지원 확인
            const supportsWebP = document.createElement('canvas')
                .toDataURL('image/webp').indexOf('data:image/webp') === 0;
            
            const imageUrl = supportsWebP ? 
                bgImage.replace('.jpeg', '.webp') : bgImage;
            
            // 이미지 프리로드 후 적용
            const img = new Image();
            img.onload = () => {
                element.style.backgroundImage = `url(${imageUrl})`;
                element.classList.add('loaded');
            };
            img.src = imageUrl;
            
            bgImageObserver.unobserve(element);
        }
    });
}, {
    rootMargin: '50px' // 50px 전에 미리 로딩
});
```
