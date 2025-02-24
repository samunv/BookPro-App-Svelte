<script>
  import { onMount } from "svelte";
  import { URLservidor } from "../../stores/store";

  let correo = "";
  let contrasena = "";
  let correoRecuperar = "";
  let mostrarVentanaRecuperar = false;


  let errorTexto = "";
  let errorBooleano = false;

  async function comprobarSesion() {
    // Verificar en localStorage si el correoSesion está presente
    const correoSesion = localStorage.getItem("correoSesion");
    if (correoSesion) {
      window.location.assign("/inicio"); // Redirige si ya está logueado
    } else {
    }
  }

  async function iniciarSesion(event) {
    event.preventDefault();

    let datos = new FormData();
    datos.append("correo", correo);
    datos.append("contrasenaLogin", contrasena);

    try {
      const response = await fetch(
        URLservidor+"/procesarlogin.php",
        {
          method: "POST",
          body: datos,
        }
      );

      const data = await response.json();

      if (data.usuario) {
        localStorage.setItem("correoSesion", data.usuario.correo);
        localStorage.setItem("nombre", data.usuario.nombre);
        localStorage.setItem("permisos", data.usuario.permisos);
        localStorage.setItem(
          "foto",
          "http://localhost/backend-bookpro" + data.usuario.foto
        );

        window.location.assign("/inicio");
      } else if (data.error) {
        errorBooleano = true;
        errorTexto = data.error + " Prueba a registrarte.";
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  }

  async function enviarCorreoRecuperacion() {
    try {
      const response = await fetch(
        `${URLservidor}/procesarlogin.php?correoRecuperar=${correoRecuperar}`
      );
      const data = await response.json();

      alert(data);
      mostrarVentanaRecuperar = false;
    } catch (error) {
      console.error("Error enviando correo de recuperación:", error);
    }
  }

  onMount(() => {
    comprobarSesion();
  });
</script>

<div class="login">
  <div class="logo-app">
    <img src="img/B-logo-bpro.png" alt="" />
    <h1>ookPro</h1>
  </div>

  <form class="formulario" on:submit={iniciarSesion}>
    <label for="correo">Correo</label>
    <div class="contenedor-input">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#ccc"
        ><path
          d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
        /></svg
      >
      <input
        type="email"
        id="correo"
        bind:value={correo}
        required
        maxlength="40"
      />
    </div>

    <label for="contrasena">Contraseña</label>
    <div class="contenedor-input">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#ccc"
        ><path
          d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"
        /></svg
      >
      <input
        type="password"
        id="contrasena"
        bind:value={contrasena}
        required
        maxlength="15"
      />
    </div>

    <button type="submit" class="btn-registrarse">Iniciar sesión</button>
  </form>

  {#if errorBooleano}
    <p style="color: red;">{errorTexto}</p>
  {/if}

  <div class="contenedor-registro-recuperar">
    <a href="/correo" class="enlace-azul"
      >¿No tienes una cuenta? Regístrate aquí.</a
    >
    <p class="enlace-azul" on:click={() => (mostrarVentanaRecuperar = true)}>
      ¿Has olvidado tu contraseña?
    </p>
  </div>

  {#if mostrarVentanaRecuperar}
    <div id="overlay" class="overlay"></div>

    <div id="ventana-recordar-contrasena">
      <h3>Introduce tu correo electrónico</h3>
      <input
        type="email"
        bind:value={correoRecuperar}
        placeholder="ejemplo@email.com"
      />
      <button type="button" on:click={enviarCorreoRecuperacion}>Enviar</button>
      <button type="button" on:click={() => (mostrarVentanaRecuperar = false)}
        >Cerrar</button
      >
    </div>
  {/if}
</div>

<style>
  .logo-app {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #006bff;
    margin: 30px;
  }

  .btn-registrarse {
    margin: 0;
  }

  .logo-app h1 {
    margin: 0;
    width: auto;
    font-weight: 1000;
  }

  .logo-app img {
    height: 100px;
    width: 100px;
    border-radius: 10px;
  }

  form {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    padding: 35px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  h1 {
    text-align: center;
    width: 40%;
    margin: 50px;
    margin-left: auto;
    margin-right: auto;
    font-size: 50px;
  }

  label {
    display: block;
    margin: 10px 0 10px;
    font-size: 15px;
  }

  .contenedor-input {
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  input {
    border: none;
    margin-left: 5px;
  }
  input:focus {
    outline: none;
  }

  button {
    width: 50%;
    padding: 20px;
    font-size: 15px;
    background-color: var(--tema-principal);
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  button:hover {
    background-color: var(--tema-principal);
  }

  #texto-autor {
    text-align: center;
    color: grey;
    margin: 50px;
  }

  #texto-morado {
    color: var(--tema-principal);
  }

  a,
  p {
    text-align: center;
  }
  #img-espana {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  #span-correo {
    color: var(--tema-principal);
  }

  #caja-telefono {
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  #telefono {
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    margin: 0px;
  }

  #telefono:focus {
    outline: none;
  }

  #bandera {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .contenedor-registro-recuperar {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .enlace-azul {
    color: var(--tema-principal);
    font-size: 17px;
    font-weight: bolder;
    text-decoration: none;
    text-align: center;
  }

  .enlace-azul:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  #enlace-volver {
    position: absolute;
    right: 90%;
    top: 50px;
    z-index: 999;
  }

  .botones {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 25px;
  }

  #seccion-confirmacion {
    display: none;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-bottom: 100px;
    background-color: white;
    border-radius: 20px;
    padding: 30px;
    z-index: 999;
  }

  #botones {
    display: flex;
    flex-direction: row;
  }

  #botones button:nth-child(2) {
    background-color: black;
  }

  #botones button {
    margin: 5px;
  }

  #seccion-confirmacion form {
    box-shadow: none;
  }

  h2 {
    max-width: 500px;
    text-align: center;
    margin-bottom: 5px;
  }

  .overlay {
    display: none;
    position: fixed;
    /* Fijo en la pantalla */
    top: 0;
    /* Arriba */
    left: 0;
    /* Izquierda */
    width: 100%;
    /* Ancho completo */
    height: 100%;
    /* Alto completo */
    background-color: rgba(0, 0, 0, 0.7);
    /* Fondo oscuro con transparencia */
    z-index: 998;
  }

  #ventana-recordar-contrasena {
    background-color: white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    text-align: center;
  }

  #correo-recuperar {
    margin: 0%;
  }

  #contenedor-recuperar {
    width: 250px;
    text-align: center;
    padding: 30px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #contraseña-nueva {
    margin-bottom: 0;
  }

  .texto-info {
    color: gray;
    font-size: small;
  }

  #btn-recuperar {
    background-color: var(--tema-principal);
    color: white;
  }

  @media (max-width: 600px) {
    h1 {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      font-size: 30px;
      margin: 20px;
      margin-top: 50px;
      width: 100%;
    }

    .formulario {
      width: 60%;
    }

    #ventana-recordar-contrasena {
      width: 60%;
      text-align: center;
    }

    .logo-app img {
      height: 70px;
      width: 70px;
    }
  }
</style>
