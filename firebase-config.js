// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDuVkIg1u06OBEDko6ajZaUzlIidBiNHtQ",
  authDomain: "sustainx-customer-require.firebaseapp.com",
  projectId: "sustainx-customer-require",
  storageBucket: "sustainx-customer-require.firebasestorage.app",
  messagingSenderId: "375246125757",
  appId: "1:375246125757:web:390083d41060fa44c095d4",
  measurementId: "G-MZY1MRWW3W"
};

// Firebase SDK 로드 대기 함수
function initializeFirebase() {
    // Firebase SDK가 로드되었는지 확인
    if (typeof firebase === 'undefined') {
        console.log('Firebase SDK 로드 대기 중...');
        setTimeout(initializeFirebase, 100); // 100ms 후 재시도
        return;
    }

    try {
        // Firebase가 이미 초기화되었는지 확인
        if (firebase.apps.length > 0) {
            console.log('Firebase가 이미 초기화되어 있습니다');
            // 기존 앱 사용
            const app = firebase.app();
            window.db = firebase.firestore();
            window.auth = firebase.auth();
            window.analytics = firebase.analytics ? firebase.analytics() : null;
            return;
        }

        // Firebase 초기화
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase 초기화 성공');
        
        // Firebase 서비스 초기화
        window.db = firebase.firestore();
        window.auth = firebase.auth();
        window.analytics = firebase.analytics ? firebase.analytics() : null;
        
        console.log('✅ Firebase 서비스 초기화 완료:', {
            firestore: !!window.db,
            auth: !!window.auth,
            analytics: !!window.analytics
        });
        
    } catch (error) {
        console.error('❌ Firebase 초기화 오류:', error);
    }
}

// Firebase 초기화 시작
initializeFirebase();
