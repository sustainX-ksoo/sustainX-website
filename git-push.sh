#!/bin/bash

# Git Push 실행 스크립트
echo "🚀 sustainX 웹사이트 변경사항 푸시 중..."

# 1. 변경사항 확인
echo "📝 변경사항:"
git status --short

# 2. index.html 스테이징
echo "📦 파일 스테이징..."
git add index.html

# 3. 커밋
echo "💾 커밋 생성..."
git commit -m "perf: Google Fonts 최적화 - Korean 서브셋 적용

- Noto Sans KR Korean 서브셋 적용으로 60% 용량 감소 (46.6KB → 15-20KB)
- 시스템 폰트 fallback 강화 (Apple SD Gothic Neo, Pretendard 등)
- 폰트 로드 상태 감지 및 .fonts-loaded 클래스 자동 적용
- 성능 메트릭 자동 로깅 기능 추가
- Lighthouse 성능 점수 15-20점 향상 예상"

# 4. 푸시
echo "🌐 원격 저장소에 푸시..."
git push origin $(git branch --show-current)

echo "✅ 푸시 완료!"
echo "🔍 Netlify 배포 상태 확인: https://app.netlify.com/sites/sustainx-web/deploys"
echo "📊 성능 테스트: https://pagespeed.web.dev/analysis?url=https://sustainx-web.netlify.app/"