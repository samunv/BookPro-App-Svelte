<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing"; // Si estás usando svelte-routing para la navegación
  import { writable } from "svelte/store";
  import { fade, fly, scale } from "svelte/transition";
  import Overlay from "../elements/Overlay.svelte";

  import { URLservidor } from "../../stores/store";

  let nombre = "";
  let telefono = "";
  let idUsuario = "";
  let fotoDePerfil = "";
  let correo = localStorage.getItem("correoSesion");

  let mostrarVentanaEditarFoto = false;
  let mostrarVentanaCerrarSesion = false;

  let fotoSeleccionada = writable("");

  let errorFoto = false;

  let mostrarOverlay = false;

  // Observar cambios en la propiedad 'mostrar'
  $: if (mostrarOverlay) {
	document.body.style.overflow = "hidden"; // Deshabilitar el scroll
  } else {
	document.body.style.overflow = ""; // Restaurar el scroll
  }

  onMount(() => {
	obtenerUsuario(correo);
  });

  // Obtener datos del usuario
  async function obtenerUsuario(correo) {
	const response = await fetch(
	  `${URLservidor}/editarperfilcontrolador.php?correoUsuario=${correo}`
	);
	const usuario = await response.json();
	usuario.forEach((u) => {
	  nombre = u.nombre;
	  telefono = u.telefono;
	  fotoDePerfil = u.foto;
	  idUsuario = u.idUsuario;
	});
  }

  // Actualizar nombre
  async function actualizarNombre() {
	const response = await fetch(
	  `${URLservidor}/editarperfilcontrolador.php?idUsuario=${idUsuario}&nombre=${nombre}`
	);
	const data = await response.json();

	if (data !== "Error") {
	  localStorage.setItem("nombre", data);
	  window.location.href = "/inicio";
	} else {
	  alert("El nombre está en uso, o no está disponible.");
	}
  }

  // Actualizar teléfono
  async function actualizarTelefono() {
	const response = await fetch(
	  `${URLservidor}/editarperfilcontrolador.php?idUsuario=${idUsuario}&telefono=${telefono}`
	);
	const data = await response.json();

	if (data !== "Error") {
	  localStorage.setItem("telefono", data);
	  window.location.href = "/inicio";
	} else {
	  alert("El teléfono está en uso, o no está disponible.");
	}
  }
  async function enviarFotoSeleccionada() {
	const formData = new FormData();
	// Usamos $fotoSeleccionada para obtener el valor real del store.
	formData.append("file", $fotoSeleccionada);
	formData.append("idUsuario", idUsuario);

	const response = await fetch(
	  `${URLservidor}/fotoperfil.php`,
	  {
		method: "POST",
		body: formData,
	  }
	);
	const data = await response.json();
	// Actualizamos la foto de perfil
	// Verificar si la respuesta es un error o éxito
	if (data === "Error") {
	  errorFoto = true;
	} else {
	  // Si es un path válido, actualizar la foto de perfil
	  fotoDePerfil = "http://localhost/backend-bookpro" + data;
	  localStorage.setItem("foto", fotoDePerfil);
	  window.location.href = "/inicio";
	}
  }

  function activarVentana(ventana) {
	if (ventana === "editarFoto") {
	  mostrarVentanaEditarFoto = true;
	} else if (ventana === "cerrarSesion") {
	  mostrarVentanaCerrarSesion = true;
	}
	document.body.style.overflowY = "hidden";
  }

  function desactivarVentana(ventana) {
	if (ventana === "editarFoto") {
	  mostrarVentanaEditarFoto = false;
	} else if (ventana === "cerrarSesion") {
	  mostrarVentanaCerrarSesion = false;
	}
	document.body.style.overflowY = "";
  }

  // Manejar la selección de archivo de imagen
  function handleFotoChange(event) {
	fotoSeleccionada.set(event.target.files[0]);
  }

  // Cerrar sesión
  async function cerrarSesion() {
	localStorage.clear();
	window.location.href = "/";
  }
</script>

<div class="contenedor-foto">
  <div class="contenedor-editar" on:click={() => activarVentana("editarFoto")}>
	<img
	  src="img/edit_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
	  alt="Editar"
	  width="20"
	  height="20"
	/>
  </div>
  <img
	src="http://localhost/backend-bookpro{fotoDePerfil}"
	alt="Foto de perfil"
	width="100"
	height="100"
	id="fotoDePerfil"
	on:click={() => activarVentana("editarFoto")}
  />
</div>
<h2 id="h2-correo">{correo}</h2>

<form class="formulario" id="formularioEditar">
  <label for="nombreEditar">Nombre</label>
  <div class="contenedores-actualizar">
	<input
	  type="text"
	  id="nombreEditar"
	  bind:value={nombre}
	  pattern="[^ ]*"
	  maxlength="15"
	  minlength="5"
	/>
	<button type="button" class="btn-actualizar" on:click={actualizarNombre}
	  >Actualizar</button
	>
  </div>

  <label for="telefonoEditar">Teléfono</label>
  <div class="contenedores-actualizar">
	<input
	  type="tel"
	  id="telefonoEditar"
	  bind:value={telefono}
	  maxlength="9"
	  minlength="9"
	/>
	<button type="button" class="btn-actualizar" on:click={actualizarTelefono}
	  >Actualizar</button
	>
  </div>
</form>

<div class="botones">
  <button on:click={() => activarVentana("cerrarSesion")} id="btn-cerrar-sesion"
	>Cerrar Sesión</button
  >
</div>

{#if mostrarVentanaEditarFoto}
  <div id="ventana-editarfoto-oculta" transition:scale={{ duration: 200 }}>
	<h2>Subir nueva foto de perfil</h2>
	<input type="file" id="archivo-foto" on:change={handleFotoChange} />
	<p>Asegúrate de que la foto sea PNG, JPG/JPEG, y que sea reconocible.</p>
	{#if errorFoto}
	  <p id="error-archivo" style="color: red;">
		Error al subir archivo. Comprueba que cumple con las condiciones.
	  </p>
	{/if}
	<div class="botones-editar-foto">
	  <button type="button" on:click={() => {desactivarVentana("editarFoto"), errorFoto = false}}
		>Cancelar</button
	  >
	  <button type="button" on:click={enviarFotoSeleccionada}>Confirmar</button>
	</div>
  </div>
  <Overlay />
{/if}

{#if mostrarVentanaCerrarSesion}
  <div id="ventana-cerrar-sesion" transition:scale={{ duration: 200 }}>
	<h2>¿Seguro que quieres cerrar sesión?</h2>
	<div class="botones-cerrar-sesion">
	  <button type="button" on:click={() => desactivarVentana("cerrarSesion")}
		>Cancelar</button
	  >
	  <button type="button" on:click={cerrarSesion}>Cerrar sesión</button>
	</div>
  </div>
  <Overlay />
{/if}

<style>
  form {
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
	background-color: #fff;
	padding: 35px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 997;
  }

  input {
	padding: 9px;
	width: 150px;
	border: 1px solid #ccc;
	border-top-right-radius: none;
	border-bottom-right-radius: none;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	font-size: 15px;
  }

  input:focus {
	outline: none;
  }

  button {
	padding: 9px;
	font-size: 15px;
	color: #fff;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
	border-top-left-radius: none;
	border-bottom-left-radius: none;
	cursor: pointer;
	background-color: var(--tema-principal);
	border: 1px transparent solid;
	transition: all 0.3s ease;
	font-weight: bold;
	display: flex;
	justify-content: center;
  }

  
  label {
    display: block;
    font-size: 15px;
    font-weight: bold;
    color: #666e7e;
  }

  .btn-actualizar:hover {
	background-color: transparent;
	color: var(--tema-principal);
	border: 1px var(--tema-principal) solid;
  }

  #texto-autor {
	text-align: center;
	color: grey;
	margin: 50px;
  }

  #texto-morado {
	color: var(--tema-principal);
  }

  #enlace-volver {
	position: absolute;
	right: 90%;
	top: 50px;
	z-index: 999;
  }

  #h2-correo{
	color:black;
  }

  .botones {
	width: 40%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 25px;
	margin-left: auto;
	margin-right: auto;
  }

  .botones button {
	background-color: transparent;

	margin: 10px;
	font-weight: bolder;
	transition: all 0.3s ease;
	background-color: var(--tema-principal);
	color: white;
	border-radius: 10px;
	border: 1px transparent solid;
  }

  .botones button:nth-child(1) {
  }

  .botones button:nth-child(2) {
	background-color: transparent;
	color: var(--tema-principal);
	border: 1px var(--tema-principal) solid;
  }

  .botones button:nth-child(2):hover {
	color: white;
	background-color: var(--tema-principal);
	border: 1px solid transparent;
  }

  .contenedores-actualizar {
	width: 85%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
  }

  #formularioEditar{
	margin-top: 5px;
  }

  #fotoDePerfil {
	border-radius: 50%;
	cursor: pointer;
	border: 3px rgb(224, 224, 224) solid;
	transition: all 0.3s ease;
	object-fit: cover;
  }

  #ventana-editarfoto-oculta {
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 1201;
	background-color: white;
	border-radius: 20px;
	position: fixed;
	padding: 30px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	transition: all 0.3s ease;
  }
  
  #error-archivo{
	background-color: rgb(255, 247, 247);
	border-radius: 10px;
	padding: 5px;
  }

  #ventana-editarfoto-oculta p {
	width: 70%;
	color: gray;
  }

  #ventana-editarfoto-oculta .botones-editar-foto {
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 20px;
  }

  #ventana-editarfoto-oculta .botones-editar-foto button {
	background-color: black;
	padding: 10px;
	font-size: 15px;
	color: #fff;
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.3s ease;
	font-weight: bold;
	margin: 10px;
  }

  #ventana-editarfoto-oculta .botones-editar-foto button:nth-child(2) {
	background-color: var(--tema-principal);
  }

  #fotoDePerfil:hover {
	border: 3px var(--tema-principal) solid;
  }

  .contendor-foto {
	margin: 10px;
	position: static;
  }

  #archivo-foto {
	width: 70%;
	border-radius: 10px;
  }

  .contenedor-editar {
	background-color: var(--tema-principal);
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 989;
	position: absolute;
	transform: translate(70px, 70px);
	cursor: pointer;
  }

  #btn-cerrar-sesion {
	background-color: black;
	border: 1px solid black;
	padding: 20px;
  }

  #btn-cerrar-sesion:hover {
	background-color: transparent;
	color: black;
  }

  @media (max-width: 600px) {
	form {
	  width: 60%;
	  overflow: hidden;
	  display: flex;
	  align-items: center;
	  font-size: 14px;
	}

	.contenedores-actualizar {
	  width: 290px;
	  justify-content: center;
	}

	input {
	  width: 125px;
	  font-size: 13px;
	}

	.botones {
	  width: 60%;
	}

	button {
	  font-size: 13px;
	}

	#ventana-editarfoto-oculta {
	  width: 70%;
	}
  }

  #ventana-cerrar-sesion {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30%;
	z-index: 1201;
	background-color: white;
	border-radius: 20px;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	padding: 30px;
	transition: all 0.3s ease;
  }

  #ventana-cerrar-sesion h3 {
	margin: 0;
	margin-bottom: 15px;
  }

  .botones-cerrar-sesion {
	display: flex;
	gap: 10px;
  }

  .botones-cerrar-sesion button {
	padding: 10px;
	font-size: 15px;
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.3s ease;
	font-weight: bold;
  }

  .botones-cerrar-sesion button:nth-child(1) {
	background-color: black;
	color: white;
  }

  .botones-cerrar-sesion button:nth-child(2) {
	background-color: var(--tema-principal);
	color: white;
  }

</style>
