<script>
    import { onMount } from "svelte";
    import {URLservidor} from "../../stores/server";
  
    let servicios = [];
  
    const url = `${URLservidor}/servicioscontrolador.php`;
  
    onMount(async () => {
      await obtenerServicios();
    });
  
    async function obtenerServicios() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        servicios = data;
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    }
  
    function guardarDatoTemporal(key, value) {
      sessionStorage.setItem(key, value);
    }
  
    function elegirServicio(servicio) {
      guardarDatoTemporal("idServicio", servicio.idServicio);
      guardarDatoTemporal("nombreServicio", servicio.nombreServicio);
      guardarDatoTemporal("precio", servicio.precio);
      guardarDatoTemporal("duracion", servicio.duracion);
      window.location.href = "/reserva";
    }
  </script>

  <div class="seccion-servicios">
    {#each servicios as servicio}
      <div
        class="contenedor-servicio"
        on:click={() => elegirServicio(servicio)}
        style="background-image: url('{servicio.imagen}')"
      >
        <div class="texto-servicios">
          <h2>{servicio.nombreServicio}</h2>
          <p>Precio: {servicio.precio} €</p>
          <p>Duración: {servicio.duracion} min</p>
        </div>
        <img
          src="img/arrow_circle_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
          width="40"
          height="40"
          class="icono-anadir"
        />
      </div>
    {/each}
  </div>
  
  <style>
    h1 {
      text-align: center;
      font-size: 35px;
    }
  
    .seccion-servicios {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  
    .contenedor-servicio {
      background-size: cover;
      background-position: center;
      padding: 30px;
      border-radius: 20px;
      width: 40%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  
    .contenedor-servicio:hover {
      transform: scale(1.05);
    }
  
    .texto-servicios {
      width: 35%;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 8px;
      padding: 15px 30px;
    }
  
    .icono-anadir {
      width: 40px;
      height: 40px;
    }
  
    @media (max-width: 600px) {
      .contenedor-servicio {
        width: 80%;
        padding: 10px;
        height: 140px;
        margin: 20px;
      }
  
      .contenedor-servicio:hover {
        transform: none;
      }
  
      .texto-servicios {
        height: 70%;
        width: 60%;
        padding: 15px;
        font-size: 12px;
        font-weight: normal;
      }
  
      .texto-servicios h2 {
        font-size: 14px;
        margin: 0%;
      }
  
      .icono-anadir {
        width: 30px;
        height: 30px;
      }
    }
  </style>
  