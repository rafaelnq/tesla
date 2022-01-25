import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6_8dmtQmz2VfPD0SHaaUU1CdmkRlACJQ',
  authDomain: 'tesla-af1ff.firebaseapp.com',
  projectId: 'tesla-af1ff',
  storageBucket: 'tesla-af1ff.appspot.com',
  messagingSenderId: '40913986060',
  appId: '1:40913986060:web:f323ef9969deabded40429',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
