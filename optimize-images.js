const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 이미지 최적화 설정
const optimization = {
    // 배경 이미지 크기별 설정
    sizes: {
        mobile: { width: 768, quality: 85 },
        tablet: { width: 1024, quality: 85 },
        desktop: { width: 1920, quality: 80 }
    },
    // WebP 품질 설정
    webp: {
        quality: 80,
        effort: 6
    },
    // JPEG 품질 설정
    jpeg: {
        quality: 85,
        progressive: true,
        mozjpeg: true
    }
};

// 배경 이미지 파일 목록
const backgroundImages = [
    'images/section/hero/hero-bg.jpeg',
    'images/section/diff/AdobeStock_1186836910.jpeg',
    'images/section/process/AdobeStock_1338630829.jpeg',
    'images/section/services/AdobeStock_1235752382.jpeg',
    'images/section/cta/cta-bg.jpeg',
    'images/section/concerns/concerns-bg.jpeg',
    'images/section/footer/footer-bg.jpeg',
    'images/admin/admin-bg.jpeg'
];

// 출력 디렉토리 생성
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 파일 크기를 MB 단위로 포맷
function formatFileSize(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

// 이미지 최적화 함수
async function optimizeImage(inputPath, outputDir, basename) {
    const originalStats = fs.statSync(inputPath);
    console.log(`\n처리 중: ${basename}`);
    console.log(`원본 크기: ${formatFileSize(originalStats.size)}`);
    
    try {
        // 원본 이미지 정보 확인
        const metadata = await sharp(inputPath).metadata();
        console.log(`원본 해상도: ${metadata.width}x${metadata.height}`);
        
        // 1. 최적화된 JPEG 생성 (호환성용)
        const optimizedJpegPath = path.join(outputDir, `${basename}-optimized.jpg`);
        await sharp(inputPath)
            .jpeg(optimization.jpeg)
            .resize(1920, null, { 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .toFile(optimizedJpegPath);
        
        const jpegStats = fs.statSync(optimizedJpegPath);
        console.log(`최적화된 JPEG: ${formatFileSize(jpegStats.size)} (${((jpegStats.size / originalStats.size) * 100).toFixed(1)}%)`);
        
        // 2. WebP 포맷 생성 (현대 브라우저용)
        const webpPath = path.join(outputDir, `${basename}.webp`);
        await sharp(inputPath)
            .webp(optimization.webp)
            .resize(1920, null, { 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .toFile(webpPath);
        
        const webpStats = fs.statSync(webpPath);
        console.log(`WebP: ${formatFileSize(webpStats.size)} (${((webpStats.size / originalStats.size) * 100).toFixed(1)}%)`);
        
        // 3. 반응형 이미지 생성
        for (const [sizeName, config] of Object.entries(optimization.sizes)) {
            // WebP 반응형
            const responsiveWebpPath = path.join(outputDir, `${basename}-${sizeName}.webp`);
            await sharp(inputPath)
                .webp({ quality: config.quality })
                .resize(config.width, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .toFile(responsiveWebpPath);
            
            // JPEG 반응형
            const responsiveJpegPath = path.join(outputDir, `${basename}-${sizeName}.jpg`);
            await sharp(inputPath)
                .jpeg({ quality: config.quality, progressive: true })
                .resize(config.width, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .toFile(responsiveJpegPath);
            
            const responsiveStats = fs.statSync(responsiveWebpPath);
            console.log(`${sizeName} WebP: ${formatFileSize(responsiveStats.size)}`);
        }
        
        return {
            original: originalStats.size,
            optimizedJpeg: jpegStats.size,
            webp: webpStats.size,
            savings: originalStats.size - jpegStats.size
        };
        
    } catch (error) {
        console.error(`${basename} 최적화 실패:`, error.message);
        return null;
    }
}

// 메인 실행 함수
async function main() {
    console.log('=== SustainX 배경 이미지 최적화 시작 ===\n');
    
    // 출력 디렉토리 생성
    const outputDir = 'images/optimized';
    ensureDir(outputDir);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;
    
    // 각 이미지 처리
    for (const imagePath of backgroundImages) {
        if (fs.existsSync(imagePath)) {
            const basename = path.basename(imagePath, path.extname(imagePath));
            const result = await optimizeImage(imagePath, outputDir, basename);
            
            if (result) {
                totalOriginalSize += result.original;
                totalOptimizedSize += result.optimizedJpeg;
                processedCount++;
            }
        } else {
            console.log(`파일 없음: ${imagePath}`);
        }
    }
    
    // 결과 요약
    console.log('\n=== 최적화 완료 ===');
    console.log(`처리된 이미지: ${processedCount}개`);
    console.log(`총 원본 크기: ${formatFileSize(totalOriginalSize)}`);
    console.log(`총 최적화 크기: ${formatFileSize(totalOptimizedSize)}`);
    console.log(`총 절약 용량: ${formatFileSize(totalOriginalSize - totalOptimizedSize)}`);
    console.log(`압축률: ${((totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
    
    // 사용법 안내
    console.log('\n=== 사용법 ===');
    console.log('1. images/optimized/ 폴더의 최적화된 이미지 확인');
    console.log('2. HTML에서 WebP 우선, JPEG 대안으로 설정');
    console.log('3. CSS에서 반응형 이미지 적용');
    console.log('\n예시:');
    console.log('<picture>');
    console.log('  <source media="(max-width: 768px)" srcset="images/optimized/hero-bg-mobile.webp" type="image/webp">');
    console.log('  <source media="(max-width: 768px)" srcset="images/optimized/hero-bg-mobile.jpg">');
    console.log('  <source srcset="images/optimized/hero-bg.webp" type="image/webp">');
    console.log('  <img src="images/optimized/hero-bg-optimized.jpg" alt="Hero Background">');
    console.log('</picture>');
}

// 실행
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { optimizeImage, optimization };
