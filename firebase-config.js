// Firebase SDK 초기화
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

// Firebase SDK가 이미 로드되어 있으므로 compat 버전 사용
try {
    // Firebase 초기화
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase 초기화 성공');
    
    // Firebase 서비스 초기화
    const db = firebase.firestore();
    const auth = firebase.auth();
    const analytics = firebase.analytics ? firebase.analytics() : null;
    
    // 글로벌 변수로 설정
    window.db = db;
    window.auth = auth;
    window.analytics = analytics;
    
    console.log('Firebase 서비스 초기화 완료:', {
        firestore: !!db,
        auth: !!auth,
        analytics: !!analytics
    });
    
} catch (error) {
    console.error('Firebase 초기화 오류:', error);
} 