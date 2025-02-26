<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade, scale } from "svelte/transition";
  import Overlay from "../elements/Overlay.svelte";

  let nombre = "";
  let telefono = "";
  let correo = sessionStorage.getItem("correoRegistro");
  let contrasena = "";
  let token = "";
  let mostrarConfirmacion = false;
  let overlayVisible = false;

  comprobarCorreoIngresado();

  function comprobarCorreoIngresado() {
    if (
      sessionStorage.getItem("correoRegistro") === "" ||
      sessionStorage.getItem("correoRegistro") === null
    ) {
      cerrarSesion();
    }
  }

  function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "/correo";
  }

  function validarNombre() {
    nombre = nombre
      .replace(/[^A-Za-z0-9\s]/g, "")
      .replace(/\s{3,}/g, "  ")
      .replace(/^\s+/g, "");
  }

  function validarTelefono() {
    telefono = telefono.replace(/\D/g, "");
  }

  async function registrarUsuario(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);
    formData.append("correo-registro", correo);
    formData.append("contrasena", contrasena);

    try {
      let response = await fetch(
        "http://localhost/backend-bookpro/Controlador/registrocontrolador.php",
        {
          method: "POST",
          body: formData,
        }
      );
      let data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        mostrarConfirmacion = true;
        overlayVisible = true;

        setTimeout(() => {
          mostrarConfirmacion = false;
          overlayVisible = false;
          sessionStorage.clear();
          window.location.href = "/"; // Redirigir al login
        }, 2000);
      }
    } catch (error) {
      console.error("Error en el registro", error);
    }
  }
</script>

<h1>Rellena con tus datos</h1>
<form class="formulario" on:submit={registrarUsuario}>
  <label for="nombre">Nombre</label>
  <input
    type="text"
    id="nombre"
    bind:value={nombre}
    on:input={validarNombre}
    required
    maxlength="15"
    minlength="5"
    placeholder="Ej: Rodrigo"
  />

  <label for="contrasena">Contraseña (8 caracteres mínimo)</label>
  <input
    type="password"
    id="contrasena"
    bind:value={contrasena}
    required
    maxlength="20"
    minlength="8"
  />

  <label for="correo">Correo</label>
  <input
    type="email"
    id="correo"
    bind:value={correo}
    required
    maxlength="40"
    readonly
    placeholder="usuario@email.com"
  />

  <label for="telefono">Teléfono</label>
  <div id="caja-telefono">
    <img src="img/Bandera_de_España_(sin_escudo).svg.png" alt="" id="bandera" />
    <input
      type="tel"
      id="telefono"
      bind:value={telefono}
      on:input={validarTelefono}
      required
      maxlength="9"
      minlength="9"
      placeholder="Ej: 611 234 512"
    />
  </div>

  <button type="submit">Registrarse</button>
</form>

<a href="/correo" class="enlace-azul" id="enlace-volver-atras">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="var(--tema-principal)"
    ><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg
  >Volver atrás</a
>

{#if mostrarConfirmacion}
  <div id="ventana-exito" transition:scale={{ duration: 200 }}>
    <h2>¡Bienvenido, {nombre}!</h2>
    <p>Te has registrado con éxito</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="50px"
      viewBox="0 -960 960 960"
      width="50px"
      fill="var(--tema-principal)"
      ><path
        d="m430-500 283-283q12-12 28-12t28 12q12 12 12 28t-12 28L487-444l-57-56Zm99 99 254-255q12-12 28.5-12t28.5 12q12 12 12 28.5T840-599L586-345l-57-56ZM211-211q-91-91-91-219t91-219l120-120 59 59q7 7 12 14.5t10 15.5l148-149q12-12 28.5-12t28.5 12q12 12 12 28.5T617-772L444-599l-85 84 19 19q46 46 44 110t-49 111l-57-56q23-23 25.5-54.5T321-440l-47-46q-12-12-12-28.5t12-28.5l57-56q12-12 12-28.5T331-656l-64 64q-68 68-68 162.5T267-267q68 68 163 68t163-68l239-240q12-12 28.5-12t28.5 12q12 12 12 28.5T889-450L649-211q-91 91-219 91t-219-91Zm219-219ZM680-39v-81q66 0 113-47t47-113h81q0 100-70.5 170.5T680-39ZM39-680q0-100 70.5-170.5T280-921v81q-66 0-113 47t-47 113H39Z"
      />
    </svg>
  </div>
{/if}

{#if overlayVisible}
  <Overlay />
{/if}

<style>
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
    margin-left: auto;
    margin-right: auto;
    font-size: 50px;
    margin-top: 30px;
  }

  label {
    display: block;
    margin: 10px 0 10px;
    font-size: 15px;
    font-weight: bold;
    color: #666e7e;
  }
  
  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
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

  #enlace-volver-atras {
    margin-top: 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
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

  #enlace-registro {
    margin-top: 50px;
  }

  .enlace-azul {
    color: var(--tema-principal);
    font-size: 17px;
    font-weight: bolder;
    text-decoration: none;
  }

  .enlace-azul:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  #btn-cerrar-sesion {
    background-color: black;
    width: 30%;
    margin: 10px;
  }

  #btn-eliminar {
    background-color: red;
    width: 30%;
    margin: 10px;
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

  #ventana-exito {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-bottom: 100px;
    background-color: white;
    border-radius: 20px;
    padding: 30px;
    z-index: 1210;
  }

  #ventana-exito p {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .correo-azul {
    color: var(--tema-principal);
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
    margin: 0px;
    padding: 0;
    box-shadow: none;
  }

  h2 {
    max-width: 500px;
    text-align: center;
    margin-bottom: 5px;
  }

  #ventana-recordar-contrasena {
    background-color: white;
    padding: 30px;
    display: none;
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
