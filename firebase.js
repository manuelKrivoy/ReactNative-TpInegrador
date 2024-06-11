// para instalar firebase corrí:
// - npx expo install firebase
// . npm install firebase
//
// y routing
// -  npm install @react-navigation/native @react-navigation/stack
// -  npx expo install react-native-screens react-native-safe-area-context


// Importa las funciones necesarias de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCRX53nlM7F8cWlziPr-lrYC60gknoVi68",
    authDomain: "apphibridas-up.firebaseapp.com",
    projectId: "apphibridas-up",
    storageBucket: "apphibridas-up.appspot.com",
    messagingSenderId: "464953033728",
    appId: "1:464953033728:web:4bd497ad916e8e21ba84e5",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, analytics, auth, db };
