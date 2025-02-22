<script>
	import { fade, scale } from "svelte/transition";
	import Overlay from "../elements/Overlay.svelte";
  
	let correo = "";
	let token = "";
	let mostrarConfirmacion = false;
	let overlayVisible = false;
  
	async function registrarCorreo(event) {
	  event.preventDefault();
	  let formData = new FormData();
	  formData.append("correo", correo);
  
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
		}
	  } catch (error) {
		console.error("Error en el registro", error);
	  }
	}
  
	async function verificarToken(event) {
	  event.preventDefault();
	  try {
		let response = await fetch(
		  `http://localhost/backend-bookpro/Controlador/registrocontrolador.php?token=${token}&correoToken=${correo}`
		);
		let data = await response.json();
		if (data) {
		  alert(data.mensaje);
		  sessionStorage.setItem("correoRegistro", correo);
		  window.location.href = "/registro";
		}
	  } catch (error) {
		console.error("Error en la verificación", error);
	  }
	}
  
	async function cancelarRegistro() {
	  await fetch(
		`http://localhost/backend-bookpro/Controlador/registrocontrolador.php?correoEliminar=${correo}`
	  );
	  alert("El usuario no se ha registrado.");
	  window.location.reload();
	}
  </script>
  
  <h1>Introduce tu Email</h1>
  <form class="formulario" on:submit={registrarCorreo}>

	<input
	  type="email"
	  id="correo"
	  bind:value={correo}
	  required
	  maxlength="40"
	  placeholder="usuario@email.com"
	/>

	<button type="submit">Continuar</button>
  </form>
  
  <a href="/" class="enlace-azul" id="enlace-volver-atras">
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
	<div id="seccion-confirmacion" transition:scale={{ duration: 200 }}>
	  <h2>
		Introduce el código de verificación que hemos enviado a <span
		  class="correo-azul">{correo}</span
		>
	  </h2>
	  <form on:submit={verificarToken}>
		<input
		  type="text"
		  id="token"
		  bind:value={token}
		  required
		  maxlength="8"
		  minlength="8"
		/>
		<div id="botones">
		  <button type="submit">Verificar</button>
		  <button type="button" on:click={cancelarRegistro}>Cancelar</button>
		</div>
	  </form>
	</div>
  {/if}
  
  {#if overlayVisible}
	<Overlay />
  {/if}
  
  <style>
	form {
	  width: 500px;
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
	}
  
	label {
	  display: block;
	  margin: 10px 0 10px;
	  font-size: 15px;
	}
  
	input {
	  width: 90%;
	  padding: 10px;
	  border: 1px solid #ccc;
	  border-radius: 10px;
	  font-size: 15px;
	}
  
	input:focus {
	  outline: none;
	}

	#token{
		margin-top: 20px;
	}
  
	button {
	  width: 30%;
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
  
	
  
	#enlace-volver-atras {
	  margin-top: 30px;
	  padding-bottom: 50px;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
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

  

  
	#enlace-volver {
	  position: absolute;
	  right: 90%;
	  top: 50px;
	  z-index: 999;
	}
  
	#botones {
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  padding: 25px;
	}
  
	#seccion-confirmacion {
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
  
	.correo-azul {
	  color: var(--tema-principal);
	}
  
	#botones button{
		width: auto;
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
	  button{
		width: 50%;
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
  