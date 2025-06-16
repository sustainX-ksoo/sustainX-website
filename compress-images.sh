#!/bin/bash

# SustainX 이미지 최적화 스크립트
# 사용법: ./compress-images.sh

echo "=== SustainX 배경 이미지 최적화 시작 ==="
echo ""

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 최적화된 이미지 저장 디렉토리 생성
OPTIMIZED_DIR="images/optimized"
if [ ! -d "$OPTIMIZED_DIR" ]; then
    mkdir -p "$OPTIMIZED_DIR"
    echo -e "${GREEN}✓${NC} 최적화 디렉토리 생성: $OPTIMIZED_DIR"
fi

# 배경 이미지 목록
declare -a images=(
    "images/section/hero/hero-bg.jpeg"
    "images/section/diff/AdobeStock_1186836910.jpeg"
    "images/section/process/AdobeStock_1338630829.jpeg"
    "images/section/services/AdobeStock_1235752382.jpeg"
    "images/section/cta/cta-bg.jpeg"
    "images/section/concerns/concerns-bg.jpeg"
    "images/section/footer/footer-bg.jpeg"
    "images/admin/admin-bg.jpeg"
)

# ImageMagick 설치 확인
if ! command -v convert &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} ImageMagick이 설치되지 않았습니다."
    echo "macOS: brew install imagemagick"
    echo "Ubuntu: sudo apt-get install imagemagick"
    echo ""
    echo "또는 온라인 도구를 사용하세요:"
    echo "- TinyJPG: https://tinyjpg.com/"
    echo "- Squoosh: https://squoosh.app/"
    exit 1
fi

echo "ImageMagick으로 이미지 최적화 중..."
echo ""

total_original=0
total_optimized=0

# 각 이미지 처리
for img in "${images[@]}"; do
    if [ -f "$img" ]; then
        # 파일명 추출
        filename=$(basename "$img")
        name="${filename%.*}"
        
        echo -e "${YELLOW}처리 중:${NC} $filename"
        
        # 원본 크기 확인
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        original_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc)
        echo "  원본 크기: ${original_mb}MB"
        
        # 최적화된 JPEG 생성 (데스크톱용)
        output_jpeg="$OPTIMIZED_DIR/${name}.jpg"
        convert "$img" -resize 1920x1080\> -quality 85 -strip "$output_jpeg"
        
        # WebP 생성 (데스크톱용)
        output_webp="$OPTIMIZED_DIR/${name}.webp"
        convert "$img" -resize 1920x1080\> -quality 80 -strip "$output_webp"
        
        # 모바일용 생성
        mobile_jpeg="$OPTIMIZED_DIR/${name}-mobile.jpg"
        mobile_webp="$OPTIMIZED_DIR/${name}-mobile.webp"
        convert "$img" -resize 768x432\> -quality 85 -strip "$mobile_jpeg"
        convert "$img" -resize 768x432\> -quality 80 -strip "$mobile_webp"
        
        # 태블릿용 생성
        tablet_jpeg="$OPTIMIZED_DIR/${name}-tablet.jpg"
        tablet_webp="$OPTIMIZED_DIR/${name}-tablet.webp"
        convert "$img" -resize 1024x576\> -quality 85 -strip "$tablet_jpeg"
        convert "$img" -resize 1024x576\> -quality 80 -strip "$tablet_webp"
        
        # 최적화된 크기 확인
        if [ -f "$output_jpeg" ]; then
            optimized_size=$(stat -f%z "$output_jpeg" 2>/dev/null || stat -c%s "$output_jpeg" 2>/dev/null)
            optimized_mb=$(echo "scale=2; $optimized_size / 1024 / 1024" | bc)
            compression_ratio=$(echo "scale=1; $optimized_size * 100 / $original_size" | bc)
            
            echo "  최적화: ${optimized_mb}MB (${compression_ratio}%)"
            
            total_original=$((total_original + original_size))
            total_optimized=$((total_optimized + optimized_size))
        fi
        
        echo -e "${GREEN}✓${NC} 완료: 데스크톱, 태블릿, 모바일 버전 생성"
        echo ""
        
    else
        echo -e "${RED}✗${NC} 파일 없음: $img"
    fi
done

# 전체 결과 요약
if [ $total_original -gt 0 ]; then
    total_original_mb=$(echo "scale=2; $total_original / 1024 / 1024" | bc)
    total_optimized_mb=$(echo "scale=2; $total_optimized / 1024 / 1024" | bc)
    total_savings=$(echo "scale=2; ($total_original - $total_optimized) / 1024 / 1024" | bc)
    compression_percent=$(echo "scale=1; $total_optimized * 100 / $total_original" | bc)
    
    echo "=== 최적화 완료 ==="
    echo "원본 총 크기: ${total_original_mb}MB"
    echo "최적화 총 크기: ${total_optimized_mb}MB"
    echo "절약 용량: ${total_savings}MB"
    echo "압축률: ${compression_percent}%"
    echo ""
fi

echo "=== 생성된 파일 ==="
echo "최적화된 이미지 위치: $OPTIMIZED_DIR/"
ls -la "$OPTIMIZED_DIR/" | grep -E '\.(jpg|webp)$'

echo ""
echo "=== 다음 단계 ==="
echo "1. images/optimized/ 폴더의 파일들을 확인하세요"
echo "2. HTML에서 data-bg 속성을 최적화된 이미지로 업데이트하세요"
echo "3. 브라우저에서 로딩 성능을 테스트하세요"
echo ""
echo -e "${GREEN}최적화 완료!${NC}"
