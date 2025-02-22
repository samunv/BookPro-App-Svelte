<script>
	let nombre = localStorage.getItem("nombre") || "";
	let foto = localStorage.getItem("foto") || "/img/default.png";
	let correoSesion = localStorage.getItem("correoSesion");
	let permisos = localStorage.getItem("permisos");

	let SVGflecha = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="white" class="icono-flecha"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>`;

	let path = location.pathname;

	comprobarSesion();

	/*
	Función para comprobar la sesión. La sesión se maneja con el correo del usuario almacenado en LocalStorage.
	
	Si el navegador encuentra la variable correoSesion en vacío o nula, nos cerrará directamente la sesión, 
	con la función cerrarSesion()
	
	Esta función nos redirigirá a "/" o componente Login para que el usuario pueda iniciar la sesión.
	*/

	async function comprobarSesion() {
		if (correoSesion === "" || correoSesion === null) {
			alert("No hay sesión iniciada.");
			cerrarSesion();
		}
	}

	function cerrarSesion() {
		localStorage.removeItem("correoSesion");
		localStorage.removeItem("nombre");
		localStorage.removeItem("foto");
		localStorage.removeItem("permisos");
		window.location.href = "/";
	}
</script>

<header>
	<div class="elementos-header1">
		<a href="/inicio">
			<h1 id="titulo-pagina">
				{#if path === "/inicio"}
					BookPro
				{:else if path === "/empresa"}
					{@html SVGflecha}Empresa
				{:else if path === "/perfil"}
					{@html SVGflecha}Mi Perfil
				{:else if path === "/servicio"}
					{@html SVGflecha}Servicio
				{:else if path === "/ver-citas"}
					{@html SVGflecha}Mis Citas
				{:else if path === "/notificaciones"}
					{@html SVGflecha}Notificaciones
				{:else if path === "/servicio"}
					{@html SVGflecha}Servicios
				{:else if path === "/agenda"}
					{@html SVGflecha}Mi Agenda
				{:else}Pendiente...{/if}
			</h1>
		</a>
	</div>

	<a href="/perfil" id="ir-a-perfil">
		<div class="elementos-header2">
			<img src={foto} alt="" id="img-foto" width="50" height="50" />

			<div class="nombre-correo-usuario">
				<p id="nombre-usuario">
					{nombre}
					{#if permisos === "1"}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="20px"
							viewBox="0 -960 960 960"
							width="20px"
							fill="white"
							><path
								d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"
							/></svg
						>
					{/if}
				</p>
				<p id="correo-usuario">{correoSesion}</p>
			</div>
		</div>
	</a>
</header>

<style>
	header {
		background-color: var(--tema-principal);
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		height: 170px;
		color: var(--color-texto-complementario);
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: -1;
	}

	.elementos-header1 {
		display: flex;
		align-items: center;
		padding: 0px;
	}

	h1 {
		color: var(--color-texto-complementario);
		text-align: center;
		font-size: 35px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.icono-flecha {
		transition: transform 0.3s ease; /* Suaviza la animación */
	}

	#titulo-pagina:hover .icono-flecha {
		transform: translateY(-5px) rotate(10deg);
	}
	#titulo-pagina {
		width: 300px;
	}
	.elementos-header2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	header a {
		text-decoration: none;
		color: var(--color-texto-complementario);
		padding: 0;
	}

	.nombre-correo-usuario {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	#correo-usuario {
		font-size: 15px;
		max-width: 190px;
		overflow: hidden;
	}

	.nombre-correo-usuario p {
		margin: 0px;
	}

	#img-foto {
		overflow: hidden;
		border-radius: 50%;
		border: 2px var(--color-texto-complementario) solid;
		object-fit: cover;
	}

	#nombre-usuario {
		font-weight: bold;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	@media (max-width: 600px) {
		header {
			height: 100px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: -1;
		}

		#titulo-pagina {
			width: auto;
		}

		h1 {
			font-size: 20px;
		}

		header .elementos-header1 {
			font-size: 20px;
			margin: 20px;
		}

		header .elementos-header2 {
			margin: 20px;
		}
		header .elementos-header2 img {
			width: 30px;
			height: 30px;
		}
		.elementos-header2 #correo-usuario {
			font-size: 14px;
			display: none;
		}
		.elementos-header2 #nombre-usuario {
			font-size: 14px;
		}

		.elementos-header1 #icono-accion {
			width: 20px;
			height: 20px;
		}

		.elementos-header1 #titulo-pagina {
			font-size: 18px;
		}

		.nombre-correo-usuario {
			margin-left: 5px;
		}
	}
</style>
