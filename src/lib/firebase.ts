import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyB5Kog8FpvjxEmuFWZT1wJ2pMgryUYvVdw",
  authDomain: "my-cool-app-5ff70.firebaseapp.com",
  databaseURL: "https://my-cool-app-5ff70-default-rtdb.firebaseio.com",
  projectId: "my-cool-app-5ff70",
  storageBucket: "my-cool-app-5ff70.appspot.com",
  messagingSenderId: "472794826324",
  appId: "1:472794826324:web:5a97e316bd9a5bd2ae4fc1",
  measurementId: "G-VYGKZ6QGRS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

// @returns a store with current firebase user

function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });
    return () => unsubscribe();
  });

  return {
    subscribe,
  }
}

export const user = userStore();