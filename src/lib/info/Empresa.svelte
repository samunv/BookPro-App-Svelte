<script>
  import { onMount } from "svelte";

  let datosEmpresa = null;
  let fotoUsuario = "";
  let nombreUsuario = "";
  let correoUsuario = "";

  // Almacenamiento de datos temporales (sessionStorage)
  function obtenerDatoTemporal(clave) {
	return sessionStorage.getItem(clave);
  }

  // Comprobar sesión
  async function comprobarSesion() {
	const response = await fetch("./../Controlador/procesarsesion.php");
	const data = await response.json();
	if (!data.sesion) {
	  window.location.href = "login.php";
	}
  }

  // Obtener los datos de la empresa
  async function obtenerDatos() {
	const response = await fetch("./datos-empresa.json");
	const data = await response.json();
	datosEmpresa = data;
  }

  // Ejecutar al montar el componente
  onMount(() => {
	//comprobarSesion();

	// Obtener información del usuario
	fotoUsuario = obtenerDatoTemporal("foto");
	nombreUsuario = obtenerDatoTemporal("nombre");
	correoUsuario = obtenerDatoTemporal("correo");

	obtenerDatos();
  });
</script>

<div class="contenedor-empresa">
  {#if datosEmpresa}
	<div id="contenedor-datos">
	  <iframe
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5873.147325365556!2d-3.7214247688618047!3d40.4339116828858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228419e251741%3A0xa8098098a3b356a7!2sMoncloa!5e0!3m2!1ses!2ses!4v1731363395647!5m2!1ses!2ses"
		width="600"
		height="450"
		style="border:0;"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
	  >
	  </iframe>

	  <div id="contenedor-info">
		<img src={datosEmpresa.logo} width="100" height="100" alt="Logo" />
		<h3>{datosEmpresa.nombre}</h3>

		<ul>
		  <li class="lista">
			<img
			  src="img/location_on_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png"
			  width="20"
			  height="20"
			  alt="Ubicación"
			/>
			<p>{datosEmpresa.direccion}</p>
		  </li>
		  <li class="lista">
			<img
			  src="img/pending_actions_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png"
			  width="20"
			  height="20"
			  alt="Horario"
			/>
			<p>De {datosEmpresa.hora_apertura} a {datosEmpresa.hora_cierre}</p>
		  </li>
		  <li class="lista">
			<img
			  src="img/call_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png"
			  width="20"
			  height="20"
			  alt="Teléfono"
			/>
			<p>{datosEmpresa.contacto[0].telefono}</p>
		  </li>
		  <li class="lista">
			<img
			  src="img/mail_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png"
			  width="20"
			  height="20"
			  alt="Correo"
			/>
			<p>{datosEmpresa.contacto[0].correo}</p>
		  </li>
		  <li class="lista">
			<img
			  src="img/link_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png"
			  width="20"
			  height="20"
			  alt="Sitio Web"
			/>
			<p>
			  <a href={datosEmpresa.web} target="_blank">{datosEmpresa.web}</a>
			</p>
		  </li>
		</ul>
	  </div>
	</div>
  {/if}
</div>

<style>

  .titulo {
	text-align: center;
	margin-top: 0;
  }
  #contenedor-datos {
	
	background-color: white;
	padding: 30px;
	border-radius: 20px;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-around;
	margin: 25px;
  }

  ul {
	padding: 0%;
	margin: 0%;
  }

  .contenedor-empresa {
	overflow: hidden;
  }

  #contenedor-datos iframe {
	width: 60%;
	border-radius: 10px;
  }

  #contenedor-info {
	display: flex;
	flex-direction: column;
	align-items: start;
	color: #4e4e4e;
	margin-left: 30px;
  }

  #contenedor-info h3 {
	color: black;
  }

  #contenedor-info img {
	border-radius: 10px;
  }

  .lista {
	list-style: none;
	display: flex;
	flex-direction: row;
	align-items: center;
  }

  .lista img {
	padding-right: 5px;
  }

  @media (max-width: 600px) {
	#contenedor-datos {
	  background-color: white;
	  border-radius: 10px;
	  display: flex;
	  flex-direction: column-reverse;
	  align-items: center;
	}

	.contenedor-empresa {
	  width: 90%;
	}

	#contenedor-info {
	  margin-left: 0px;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  font-size: 13px;
	  margin-bottom: 30px;
	}

	#contenedor-datos iframe {
	  width: 95%;
	  border-radius: 5px;
	}

	#contenedor-info h3 {
	  margin-bottom: 5px;
	}

	.lista p {
	  margin-top: 5px;
	  margin-bottom: 5px;
	}
  }
</style>
