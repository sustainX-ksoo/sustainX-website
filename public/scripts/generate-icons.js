const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = path.join(__dirname, '../icons/icon.svg');

async function generateIcons() {
    try {
        // 소스 SVG 파일 읽기
        const svgBuffer = await fs.readFile(sourceIcon);
        
        // 각 크기별로 아이콘 생성
        for (const size of sizes) {
            const outputPath = path.join(__dirname, `../icons/icon-${size}x${size}.png`);
            
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile(outputPath);
            
            console.log(`생성됨: icon-${size}x${size}.png`);
        }
        
        // 배지 아이콘 생성 (72x72)
        const badgePath = path.join(__dirname, '../icons/badge-72x72.png');
        await sharp(svgBuffer)
            .resize(72, 72)
            .png()
            .toFile(badgePath);
        
        console.log('생성됨: badge-72x72.png');
        
        // 오프라인 이미지 생성
        const offlineImagePath = path.join(__dirname, '../icons/offline-image.png');
        await sharp({
            create: {
                width: 512,
                height: 512,
                channels: 4,
                background: { r: 0, g: 122, b: 255, alpha: 0.1 }
            }
        })
        .composite([{
            input: svgBuffer,
            gravity: 'center'
        }])
        .png()
        .toFile(offlineImagePath);
        
        console.log('생성됨: offline-image.png');
        
        console.log('모든 아이콘이 성공적으로 생성되었습니다!');
    } catch (error) {
        console.error('아이콘 생성 중 오류 발생:', error);
    }
}

generateIcons(); 