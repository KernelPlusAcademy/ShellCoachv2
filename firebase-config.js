// DO NOT use "import" in browser JS unless you're using a bundler like Webpack/Vite

// Replace this with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyA4uVJOZ1ZWls6hK1b94Bm-waDgyJfYehM",
  authDomain: "shellcoach-eacb2.firebaseapp.com",
  projectId: "shellcoach-eacb2",
  storageBucket: "shellcoach-eacb2.appspot.com", // fixed typo here: use 'appspot.com'
  messagingSenderId: "97519723209",
  appId: "1:97519723209:web:5d815580c3d64b0f486318",
  measurementId: "G-LJZYMRCCCE"
};

firebase.initializeApp(firebaseConfig);
