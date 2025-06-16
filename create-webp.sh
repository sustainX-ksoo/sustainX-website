#!/bin/bash
# WebP 이미지 생성 및 압축 스크립트

echo "🖼️  이미지 최적화 시작..."

# 필요한 도구 확인
if ! command -v cwebp &> /dev/null; then
    echo "❌ WebP 도구가 설치되지 않았습니다."
    echo "설치 방법:"
    echo "  macOS: brew install webp"
    echo "  Ubuntu: sudo apt-get install webp"
    exit 1
fi

# 소스 이미지 디렉토리
SOURCE_DIR="images/section"
OUTPUT_DIR="images/optimized"

# 출력 디렉토리 생성
mkdir -p "$OUTPUT_DIR/hero"
mkdir -p "$OUTPUT_DIR/diff" 
mkdir -p "$OUTPUT_DIR/cta"
mkdir -p "$OUTPUT_DIR/process"
mkdir -p "$OUTPUT_DIR/services"

echo "📁 디렉토리 구조 생성 완료"

# Hero 배경
if [ -f "$SOURCE_DIR/hero/hero-bg.jpg" ]; then
    echo "🔄 Hero 배경 변환 중..."
    cwebp -q 80 -resize 1920 1080 "$SOURCE_DIR/hero/hero-bg.jpg" -o "$OUTPUT_DIR/hero/hero-bg.webp"
    echo "✅ Hero 배경 완료 (WebP)"
fi

# Diff 배경  
if [ -f "$SOURCE_DIR/diff/AdobeStock_1186836910.jpg" ]; then
    echo "🔄 Diff 배경 변환 중..."
    cwebp -q 80 -resize 1920 1080 "$SOURCE_DIR/diff/AdobeStock_1186836910.jpg" -o "$OUTPUT_DIR/diff/AdobeStock_1186836910.webp"
    echo "✅ Diff 배경 완료 (WebP)"
fi

# CTA 배경
if [ -f "$SOURCE_DIR/cta/cta-bg.jpg" ]; then
    echo "🔄 CTA 배경 변환 중..."
    cwebp -q 80 -resize 1920 1080 "$SOURCE_DIR/cta/cta-bg.jpg" -o "$OUTPUT_DIR/cta/cta-bg.webp"
    echo "✅ CTA 배경 완료 (WebP)"
fi

# Process 배경
if [ -f "$SOURCE_DIR/process/AdobeStock_584885060.jpg" ]; then
    echo "🔄 Process 배경 변환 중..."
    cwebp -q 80 -resize 1920 1080 "$SOURCE_DIR/process/AdobeStock_584885060.jpg" -o "$OUTPUT_DIR/process/AdobeStock_584885060.webp"
    echo "✅ Process 배경 완료 (WebP)"
fi

# Services 배경
if [ -f "$SOURCE_DIR/services/AdobeStock_1235752382.jpg" ]; then
    echo "🔄 Services 배경 변환 중..."
    cwebp -q 80 -resize 1920 1080 "$SOURCE_DIR/services/AdobeStock_1235752382.jpg" -o "$OUTPUT_DIR/services/AdobeStock_1235752382.webp"
    echo "✅ Services 배경 완료 (WebP)"
fi

echo ""
echo "🎉 WebP 변환 완료!"
echo ""
echo "📊 파일 크기 비교:"

# 파일 크기 비교
if [ -f "$SOURCE_DIR/hero/hero-bg.jpg" ] && [ -f "$OUTPUT_DIR/hero/hero-bg.webp" ]; then
    original_size=$(stat -f%z "$SOURCE_DIR/hero/hero-bg.jpg" 2>/dev/null || stat -c%s "$SOURCE_DIR/hero/hero-bg.jpg")
    webp_size=$(stat -f%z "$OUTPUT_DIR/hero/hero-bg.webp" 2>/dev/null || stat -c%s "$OUTPUT_DIR/hero/hero-bg.webp")
    reduction=$(echo "scale=1; (1 - $webp_size / $original_size) * 100" | bc -l 2>/dev/null || echo "계산 불가")
    echo "  Hero: $(numfmt --to=iec $original_size) → $(numfmt --to=iec $webp_size) (${reduction}% 감소)"
fi

echo ""
echo "다음 단계:"
echo "1. HTML에서 WebP 이미지 경로 업데이트"
echo "2. 폴백 이미지 경로 설정" 
echo "3. 성능 테스트 실행"
