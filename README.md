# sustainX - ESG 공급망 플랫폼

## 🌟 프로젝트 개요
sustainX는 중소 협력업체를 위한 ESG 업무 대행 서비스 플랫폼입니다. "바텀업" 접근 방식으로 3-4차 협력사부터 시작하여 ESG 생태계 전체를 혁신합니다.

## 🚀 주요 기능
- **문의 접수 시스템**: 실시간 고객 문의 접수 및 관리
- **관리자 대시보드**: Firebase 기반 실시간 문의 관리 시스템
- **반응형 디자인**: 모바일/데스크톱 완벽 대응
- **PWA 지원**: 오프라인 접근 및 앱 설치 가능
- **Firebase Auth**: 보안 강화된 관리자 인증 시스템

## 🛠 기술 스택
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Firebase (Authentication, Firestore)
- **Design**: Glassmorphism, Mobile-First Responsive
- **Security**: Firebase Security Rules, HTTPS
- **Deployment**: Netlify/Vercel Ready

## 🔧 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/[username]/sustainx-website.git
cd sustainx-website
```

### 2. Firebase 설정 (이미 완료됨)
- ✅ Firebase 프로젝트: `sustainx-customer-require`
- ✅ Authentication: 이메일/비밀번호 방식 활성화
- ✅ Firestore: 보안 규칙 설정 완료
- ✅ 설정 파일: `firebase-config.js` 준비됨

### 3. 로컬 서버 실행
```bash
# Python을 사용하는 경우
python -m http.server 8000

# Node.js를 사용하는 경우  
npx serve .

# 또는 Visual Studio Code Live Server 확장 사용
```

### 4. 관리자 계정 생성
Firebase Console에서 관리자 이메일/비밀번호 계정을 생성하세요:
- 예시: admin@sustainx.co.kr / [안전한 비밀번호]

## 🔒 보안 설정

### Firestore 보안 규칙 (설정 완료)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{inquiryId} {
      allow read: if request.auth != null;    // 인증된 사용자만 읽기
      allow create: if true;                  // 누구나 문의 등록 가능
      allow update: if request.auth != null;  // 인증된 사용자만 수정
    }
  }
}
```

### Firebase Authentication
- 이메일/비밀번호 방식 인증
- 관리자 계정 수동 생성 필요
- 자동 세션 관리 및 보안

## 📱 사용 방법

### 일반 사용자
1. 웹사이트 방문
2. "무료 상담 신청하기" 클릭
3. 문의 정보 입력 및 제출

### 관리자
1. 푸터의 저작권 표시 클릭
2. Firebase 계정으로 로그인
3. 관리자 대시보드에서 문의 관리
   - 문의 목록 조회
   - 상태 변경 (신규 → 처리중 → 완료)
   - 엑셀 내보내기
   - 필터링 및 검색

## 🌐 배포

### Netlify (권장)
1. Netlify에 깃허브 저장소 연결
2. Build settings: 기본값 사용
3. Deploy 자동 실행
4. 커스텀 도메인 연결 (선택사항)

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 📊 주요 파일 구조
```
sustainx-website/
├── index.html              # 메인 랜딩 페이지
├── admin.html              # 관리자 대시보드
├── firebase-config.js      # Firebase 설정
├── dist/output.css         # Tailwind CSS
├── images/                 # 이미지 리소스
├── manifest.json           # PWA 설정
├── sw.js                   # Service Worker
└── README.md              # 프로젝트 문서
```

## 🎨 디자인 특징
- **Glassmorphism**: 현대적인 반투명 유리 효과
- **한국어 최적화**: `word-break: keep-all` 적용
- **반응형**: 모바일/태블릿/데스크톱 완벽 대응
- **성능 최적화**: Lazy loading, PWA 지원

## 🔄 업데이트 내역

### v2.0.0 (2025-01-16)
- ✅ Firebase Authentication 연동 완료
- ✅ 관리자 로그인 시스템 보안 강화
- ✅ 실시간 인증 상태 관리
- ✅ 프로덕션 레벨 보안 규칙 적용

### v1.0.0 (2025-01-15)
- ✅ 기본 웹사이트 구축
- ✅ 문의 접수 시스템
- ✅ Firestore 연동
- ✅ 관리자 대시보드

## 🤝 기여
이슈나 풀 리퀘스트는 언제든 환영합니다!

## 📞 문의
- 이메일: contact@sustainx.co.kr
- 웹사이트: [배포 URL 추가 예정]

## 📄 라이선스
MIT License

---

**sustainX** - The Supply Chain ESG Partner  
*복잡한 ESG를 누구나 할 수 있게 만듭니다*
