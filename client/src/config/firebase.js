// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: 'portfolio-projects-3f463.firebaseapp.com',
  projectId: 'portfolio-projects-3f463',
  storageBucket: 'portfolio-projects-3f463.appspot.com',
  messagingSenderId: '127045216126',
  appId: '1:127045216126:web:9313791101310524c6b52f',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export default app
