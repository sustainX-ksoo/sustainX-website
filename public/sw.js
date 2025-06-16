const CACHE_NAME = 'sustainx-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap',
    'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('캐시가 열렸습니다');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('이전 캐시를 삭제합니다:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 네트워크 요청 처리
self.addEventListener('fetch', (event) => {
    // 네트워크 우선 전략
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // 응답이 성공적이면 캐시에 저장
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                // 오프라인일 때 캐시에서 응답
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }
                        
                        // HTML 요청인 경우 오프라인 페이지 반환
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                        
                        // 이미지 요청인 경우 기본 이미지 반환
                        if (event.request.headers.get('accept').includes('image')) {
                            return caches.match('/icons/offline-image.png');
                        }
                    });
            })
    );
});

// 백그라운드 동기화
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-messages') {
        event.waitUntil(syncMessages());
    }
});

// 푸시 알림
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '자세히 보기',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: '닫기',
                icon: '/icons/close.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('sustainX', options)
    );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// 메시지 동기화 함수
async function syncMessages() {
    try {
        const db = await openDB();
        const messages = await db.getAll('messages');
        
        for (const message of messages) {
            if (message.synced) continue;
            
            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(message)
                });
                
                if (response.ok) {
                    message.synced = true;
                    await db.put('messages', message);
                }
            } catch (error) {
                console.error('메시지 동기화 실패:', error);
            }
        }
    } catch (error) {
        console.error('데이터베이스 접근 실패:', error);
    }
}

// IndexedDB 열기
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('sustainx-db', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('messages')) {
                db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
} 