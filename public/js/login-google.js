// Importar los módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAmxIXSZwBWyyGBJmP2G_g7y5Z1VrwHQI",
  authDomain: "bookpro-b0751.firebaseapp.com",
  projectId: "bookpro-b0751",
  storageBucket: "bookpro-b0751.firebasestorage.app",
  messagingSenderId: "206419432072",
  appId: "1:206419432072:web:30400f1d390df36ea3853d",
  measurementId: "G-3Q5JJMTQ6C"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar el proveedor de Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Manejar el clic en el botón de Google Login
document.getElementById('google-login-button').addEventListener('click', function () {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // El usuario ha iniciado sesión correctamente
      const user = result.user;
      console.log('Usuario autenticado: ', user);

      // Mostrar la información del usuario (puedes usar estos datos en tu app)
      document.getElementById('user-info').style.display = 'block';
      document.getElementById('user-name').textContent = `Bienvenido, ${user.displayName}`;

      // Puedes enviar el ID token al backend si lo necesitas
      user.getIdToken().then((idToken) => {
        // Enviar el ID token al backend para su verificación si es necesario
        fetch('./../Controlador/login-google-controlador.php', {
          method: 'POST',
          body: JSON.stringify({ idToken: idToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error al verificar token:', error));
      });
    })
    .catch((error) => {
      // Manejo de errores si algo falla
      console.error('Error al iniciar sesión: ', error);
    });
});
