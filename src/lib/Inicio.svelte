<script>
  import { onMount } from "svelte";
  import { Router, Route, Link } from "svelte-routing";
  import { fly } from "svelte/transition";

  import {URLservidor} from "../stores/server";

  let cuentaNotificaciones = 0;
  const URL_USUARIO =
	URLservidor+"/indexcontrolador.php";

  let correoUsuario = localStorage.getItem("correoSesion");
  let permisos = localStorage.getItem("permisos");

  // Obtener notificaciones
  async function obtenerNotificaciones(correo) {
	try {
	  const response = await fetch(
		`${URL_USUARIO}?correoNotificaciones=${correo}`
	  );
	  const notificaciones = await response.json();
	  cuentaNotificaciones = notificaciones.length;
	} catch (error) {
	  console.error("Error al obtener notificaciones:", error);
	}
  }

  onMount(async () => {
	await obtenerNotificaciones(correoUsuario);
  });
</script>

<section class="contenedor-enlaces" id="contenido">
  {#if permisos !== "1"}
	<Link to="/servicios" class="enlaces" id="reservar-cita">
	  <div class="contenedor-img">
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  height="24px"
		  viewBox="0 -960 960 960"
		  width="24px"
		  fill="#0D99FF"
		>
		  <path
			d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
		  />
		</svg>
	  </div>
	  <div class="contenedor-txt">
		<p>Reservar Cita</p>
	  </div>
	</Link>

	<Link to="/ver-citas" class="enlaces" id="ver-citas">
	  <div class="contenedor-img">
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  height="24px"
		  viewBox="0 -960 960 960"
		  width="24px"
		  fill="#0D99FF"
		>
		  <path
			d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z"
		  />
		</svg>
	  </div>
	  <div class="contenedor-txt">
		<p>Mis Citas</p>
	  </div>
	</Link>
  {/if}

  {#if permisos === "1"}
	<Link to="/agenda" class="enlaces">
	  <div class="contenedor-img">
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  height="24px"
		  viewBox="0 -960 960 960"
		  width="24px"
		  fill="#0D99FF"
		>
		  <path
			d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z"
		  />
		</svg>
	  </div>
	  <div class="contenedor-txt">
		<p>Mi Agenda</p>
	  </div>
	</Link>
  {/if}

  <Link to="/perfil" class="enlaces" id="editar-perfil">
	<div class="contenedor-img">
	  <svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="#0D99FF"
		><path
		  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
		/></svg
	  >
	</div>
	<div class="contenedor-txt">
	  <p>Editar Perfil</p>
	</div>
</Link>

  <Link to="/empresa" class="enlaces">
	<div class="contenedor-img">
	  <svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="#0D99FF"
	  >
		<path
		  d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
		/>
	  </svg>
	</div>
	<div class="contenedor-txt">
	  <p>Empresa</p>
	</div>
</Link>

  <Link to="/notificaciones" class="enlaces" id="notificaciones">
	<div class="contenedor-foto-cuenta">
	  <div class="contenedor-img">
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  height="24px"
		  viewBox="0 -960 960 960"
		  width="24px"
		  fill="#0D99FF"
		>
		  <path
			d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
		  />
		</svg>
	  </div>
	  {#if cuentaNotificaciones > 0}
		<div id="cuenta-notificaciones">{cuentaNotificaciones}</div>
	  {/if}
	</div>

	<div class="contenedor-txt">
	  <p>Notificaciones</p>
	</div>
</Link>
</section>

<div id="texto-autor">
  <p>Desarrollado por </p>
  <img src="/book-pro-logo.svg" alt="" width="30" height="30">
</div>

<style>
  .contenedor-enlaces {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	width: 70%;
	margin-top: 30px;
  }

  h1 {
	text-align: center;
	margin: 50px;
	font-size: 35px;
	margin-left: auto;
	margin-right: auto;
  }

  :global(.enlaces) {
	overflow: hidden;
	border-radius: 15px;
	margin: 20px;
	transition: all 0.3s ease;
	background-color: var(--color-elementos) !important;
	width: 250px;
	height: 120px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-decoration: none;
  }

  :global(.enlaces):hover {
	transform: scale(1.1);
  }

  .contenedor-img {
	background-color: var(--color-secundario-complementario);
	width: 55px;
	height: 55px;
	border-radius: 50%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
  }

  .contenedor-img svg {
	width: 40px;
	height: 40px;
	fill: var(--tema-principal);
  }

  .contenedor-txt {
	color: var(--tema-principal);
	font-weight: bold;
	font-size: 23px;
	margin-left: 10px;
  }

  #texto-gris {
	color: grey;
	text-align: center;
  }

  #contenedor-oculto {
	display: none;
  }

  #cuenta-notificaciones {
	background-color: var(--tema-principal);
	color: white;
	font-weight: bold;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3px;
	position: absolute;
	transform: translate(25px, -20px);
  }

  .contenedor-foto-cuenta {
	position: static;
	display: flex;
	align-items: center;
	justify-content: center;
  }

  #instalar-app .contenedor-txt {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	height: 50px;
  }

  #instalar-app .contenedor-txt p {
	margin: 0;
  }

  #instalar-app .contenedor-txt p:nth-child(2) {
	font-size: 16px;
	color: gray;
  }

  #texto-autor {
	margin-top: 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
  }
  
  #texto-autor img{
	margin-left: 5px;
	border-radius: 2px;
  }

  @media (max-width: 600px) {
	/*Index*/
	.contenedor-enlaces {
	  width: 100%;
	  margin-left: 0;
	  margin-right: 0;
	  flex-direction: column;
	  margin-top: 0px;
	}

	#texto-gris {
	  display: none;
	}

	.enlaces {
	  width: 80%;
	  overflow: hidden;
	  border-radius: 20px;
	  height: 90px;
	  transition: all 0.3s ease;
	  background-color: white;
	  padding: 0px 20px;
	  justify-content: left;
	}

	.contenedor-txt {
	  margin-left: 15px;
	}

	.enlaces .contenedor-txt p {
	  font-size: 20px;
	  margin-left: 0px;
	}
  }
</style>
