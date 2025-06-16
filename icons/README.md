# 아이콘 파일 생성 스크립트

현재 누락된 아이콘 파일들:
- icon-144x144.png
- icon-192x192.png
- 기타 PWA 아이콘들

## 아이콘 생성 방법

### 1. 온라인 도구 사용 (권장)
1. [Favicon Generator](https://www.favicon-generator.org/) 방문
2. sustainX 로고 업로드 (또는 임시 아이콘 생성)
3. 모든 크기 아이콘 자동 생성
4. 다운로드 후 /icons/ 폴더에 저장

### 2. 빠른 임시 아이콘 생성
```bash
# ImageMagick 사용 (macOS)
convert -size 144x144 xc:'#0A1628' -fill white -gravity center -pointsize 48 -annotate +0+0 'sX' icon-144x144.png
convert -size 192x192 xc:'#0A1628' -fill white -gravity center -pointsize 64 -annotate +0+0 'sX' icon-192x192.png
convert -size 512x512 xc:'#0A1628' -fill white -gravity center -pointsize 128 -annotate +0+0 'sX' icon-512x512.png
```

### 3. 필요한 아이콘 크기들
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png ⚠️ 누락
- icon-152x152.png
- icon-192x192.png ⚠️ 누락
- icon-384x384.png
- icon-512x512.png
- favicon.ico ⚠️ 누락

## 우선순위
1. 🔥 favicon.ico (즉시 필요)
2. ⚡ icon-144x144.png (PWA 필수)
3. ⚡ icon-192x192.png (PWA 필수)
