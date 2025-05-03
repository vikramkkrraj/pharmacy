import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDILwBBbzUdMVga7sSA0x88KYttIjqePMg",
    authDomain: "pharmacy-ce314.firebaseapp.com",
    databaseURL: "https://pharmacy-ce314-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pharmacy-ce314",
    storageBucket: "pharmacy-ce314.firebasestorage.app",
    messagingSenderId: "902868558336",
    appId: "1:902868558336:web:4a1aad36ecb9b83e612ee5",
    measurementId: "G-C3JNT6W9C5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export const storage = getStorage(app);

export { app, auth, database };
