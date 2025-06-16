const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME 타입 매핑
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // URL 파싱
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // 파일 확장자 확인
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';
    
    // 파일 읽기
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // 404 에러
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <h1>404 - 파일을 찾을 수 없습니다</h1>
                    <p>요청한 파일: ${req.url}</p>
                    <p>파일 경로: ${filePath}</p>
                    <a href="/">홈으로 돌아가기</a>
                `);
            } else {
                // 500 에러
                res.writeHead(500);
                res.end(`서버 오류: ${error.code}`);
            }
        } else {
            // 성공
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Cache-Control': 'no-cache'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 sustainX 서버가 실행중입니다!`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📍 관리자 페이지: http://localhost:${PORT}/admin.html`);
    console.log(`💡 종료하려면 Ctrl+C를 누르세요`);
});

// 서버 종료 처리
process.on('SIGINT', () => {
    console.log('\n🛑 서버를 종료합니다...');
    process.exit(0);
});