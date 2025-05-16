import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyD_aWiozUs2Zf8CnduewaD-rg7OFFMM_QA",
  authDomain: "projectcollabration-e2287.firebaseapp.com",
  projectId: "projectcollabration-e2287",
  storageBucket: "projectcollabration-e2287.firebasestorage.app",
  messagingSenderId: "479132123238",
  appId: "1:479132123238:web:8a8f9d8b1eda83438deda7",
   measurementId:"G-4DS2QRYGZ7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
