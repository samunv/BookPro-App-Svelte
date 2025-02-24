<script>
  import { onMount } from "svelte";

  import { URLservidor } from "../../stores/store";

  let url = URLservidor + "/notificacionescontrolador.php";

  let notificaciones = [];
  let correo = localStorage.getItem("correoSesion");
  let nombreUsuario = "";
  let imgFoto = "";
  let cantidadNotificaciones = 0;

  onMount(async () => {
    obtenerUsuario(correo);
  });

  async function obtenerUsuario(correo) {
    const response = await fetch(`${url}?correoUsuario=${correo}`);
    const usuario = await response.json();
    if (usuario.length > 0) {
      imgFoto = usuario[0].foto;
      nombreUsuario = usuario[0].nombre;
      await obtenerNotificaciones(usuario[0].correo);
    }
  }

  async function obtenerNotificaciones(correo) {
    const response = await fetch(`${url}?correo=${correo}`);
    notificaciones = await response.json();
    cantidadNotificaciones = notificaciones.length;
  }

  async function borrarNotificaciones() {
    await fetch(`${url}?borrarNotificaciones=true&correoBorrar=${correo}`);
    await obtenerNotificaciones(correo);
  }
</script>

<button
  on:click={borrarNotificaciones}
  class="btn-borrar"
  style="display: {cantidadNotificaciones > 0 ? 'block' : 'none'}"
>
  Limpiar las notificaciones ({cantidadNotificaciones})
</button>

<div class="notificaciones">
  {#if notificaciones.length === 0}
    <div class="caja-no-notificaciones">
      <p class="no-notificaciones">
        No tienes notificaciones aún. Aquí aparecerán todas tus notificaciones.
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="150px"
        viewBox="0 -960 960 960"
        width="150px"
        fill="gray"
        ><path
          d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146.17 116Q413-417 358.5-379.5T278-280h53q22-42 62.17-65 40.18-23 87.5-23 47.33 0 86.83 23.5T630-280h52q-25-63-79.83-100-54.82-37-122-37ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.38 0 241.19-98.81Q820-337.63 820-480q0-142.38-98.81-241.19T480-820q-142.37 0-241.19 98.81Q140-622.38 140-480q0 142.37 98.81 241.19Q337.63-140 480-140Z"
        /></svg
      >
    </div>
  {:else}
    {#each notificaciones.slice().reverse() as notificacion}
      <div class="caja-notificacion">
        <img
          src={notificacion.imagen_notificacion}
          class="imagen-notificacion"
        />
        <div class="texto-notificacion">
          <p>{notificacion.titulo}</p>
          <p>{notificacion.mensaje}</p>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .notificaciones {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .caja-notificacion {
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    border-radius: 20px;
    max-width: 800px;
    margin-bottom: 30px;
    width: 600px;
  }
  .texto-notificacion {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .texto-notificacion p:nth-child(1) {
    font-weight: bold;
  }
  .texto-notificacion p {
    margin: 0;
  }
  .imagen-notificacion {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
  .no-notificaciones {
    text-align: center;
  }
  .btn-borrar {
    display: none;
    border: none;
    font-weight: bold;
    color: rgb(82, 82, 82);
    background-color: rgb(212, 212, 212);
    padding: 20px;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-borrar:hover {
    background-color: rgb(185, 185, 185);
  }

  .caja-no-notificaciones {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
