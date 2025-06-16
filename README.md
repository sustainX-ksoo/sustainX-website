# SustainX Website - ESG 플랫폼

> 공급망을 연결하는 ESG 플랫폼으로, 복잡한 ESG를 누구나 할 수 있게 만듭니다.

## 🚀 빠른 시작

### 로컬 서버 실행
```bash
npm install
npm run serve
```

브라우저에서 `http://localhost:8080` 접속

## 📊 현재 상태

### ⚠️ 성능 최적화 필요
현재 배경 이미지 용량이 **30MB**로 너무 큽니다.
- cta-bg.jpeg: **13.18MB** 🚨
- diff-bg.jpeg: 5.81MB
- hero-bg.jpeg: 4.19MB
- 기타: ~7MB

**즉시 압축 작업 필요!**

## 🛠 이미지 최적화

### 1. 자동 압축 (ImageMagick 필요)
```bash
# ImageMagick 설치 (macOS)
brew install imagemagick

# 이미지 자동 압축
chmod +x compress-images.sh
./compress-images.sh
```

### 2. 수동 압축 (권장)
1. [TinyJPG](https://tinyjpg.com/) 접속
2. 각 이미지 업로드 및 압축
3. 압축된 파일로 교체

**우선순위:**
1. 🔥 cta-bg.jpeg (13.18MB → 500KB)
2. ⚡ diff-bg.jpeg (5.81MB → 400KB)  
3. ⚡ hero-bg.jpeg (4.19MB → 500KB)

### 3. 성능 확인
```javascript
// 브라우저 콘솔에서 확인
console.log('WebP 지원:', sustainX.webpSupported);
performance.getEntriesByType('navigation')[0];
```

## 📁 파일 구조

```
sustainX-website/
├── index.html              # 메인 페이지
├── admin.html              # 관리자 페이지
├── images/                 # 이미지 파일들
│   ├── section/           # 섹션별 배경 이미지
│   └── optimized/         # 최적화된 이미지 (생성됨)
├── icons/                 # PWA 아이콘
├── docs/                  # 문서
│   ├── OPTIMIZATION_SUMMARY.md
│   └── IMAGE_OPTIMIZATION_GUIDE.md
└── compress-images.sh     # 이미지 압축 스크립트
```

## 🎯 최적화 목표

### Before (현재)
- 총 이미지: ~30MB
- 3G 로딩: 60-90초
- LCP: 5-10초

### After (목표)
- 총 이미지: ~5MB (83% ⬇️)
- 3G 로딩: 6-10초 (85% ⬇️)
- LCP: 1-3초 (70% ⬇️)

## 📱 기능

### 사용자 기능
- 반응형 디자인 (모바일/태블릿/데스크톱)
- PWA 지원 (오프라인 접근 가능)
- 무료 상담 신청 모달
- 부드러운 스크롤 애니메이션

### 기술적 기능
- 레이지 로딩 배경 이미지
- WebP 자동 감지 및 폴백
- Glassmorphism UI 디자인
- 성능 모니터링

### 관리자 기능
- 문의 접수 관리
- 비밀번호 보호 (sustainx2024!)
- 데이터 내보내기

## 🧪 성능 테스트

### 권장 도구
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://webpagetest.org/)

### Core Web Vitals 목표
- LCP < 2.5s
- FID < 100ms  
- CLS < 0.1

## 📚 문서

- [최적화 가이드](IMAGE_OPTIMIZATION_GUIDE.md)
- [최적화 요약](OPTIMIZATION_SUMMARY.md)
- [기술 가이드](optimization-guide.js)

## 🛡 보안

### 관리자 접근
- 비밀번호: `sustainx2024!`
- 세션 기반 로그인
- 로컬 스토리지 사용

### 데이터 보호
- 개인정보 로컬 저장만
- HTTPS 사용 권장
- XSS 방지 처리

## 🚀 배포

### GitHub Pages
```bash
# 저장소 푸시 후 GitHub Pages 활성화
git add .
git commit -m "이미지 최적화 완료"
git push origin main
```

### 기타 호스팅
- Netlify: 자동 HTTPS, CDN
- Vercel: 최적화된 성능
- Firebase Hosting: Google 서비스 통합

## 📞 지원

### 문제 해결
1. 이미지가 로드되지 않는 경우
   - 브라우저 콘솔 확인
   - 네트워크 탭에서 404 오류 확인
   - 파일 경로 검증

2. 성능 문제
   - 이미지 압축 상태 확인
   - WebP 지원 여부 확인
   - 캐시 설정 검토

### 연락처
- 이메일: contact@sustainx.co.kr
- 위치: 충청남도 천안시 서북구

---

## ⚡ 즉시 해야 할 작업

**🔥 긴급: cta-bg.jpeg (13.18MB) 압축**
1. [TinyJPG](https://tinyjpg.com/) 접속
2. `images/section/cta/cta-bg.jpeg` 업로드
3. 압축된 파일로 교체
4. 즉시 40% 성능 개선!

**목표: 이번 주 내 총 용량 30MB → 5MB 달성** 🎯
