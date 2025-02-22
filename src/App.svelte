<script>
  import { Router, Route } from "svelte-routing";
  import Header from "./lib/elements/Header.svelte";
  import Inicio from "./lib/Inicio.svelte";
  import Empresa from "./lib/info/Empresa.svelte";
  import Servicios from "./lib/reserva/Servicios.svelte";
  import Resumen from "./lib/reserva/Resumen.svelte";
  import Login from "./lib/auth/Login.svelte";
  import Perfil from "./lib/info/Perfil.svelte";
  import VerCitas from "./lib/info/VerCitas.svelte";
  import Notificaciones from "./lib/info/Notificaciones.svelte";
  import Registro from "./lib/auth/Registro.svelte";
  import Agenda from "./lib/admin/Agenda.svelte";
  import Reserva from "./lib/reserva/Reserva.svelte";
  import Correo from "./lib/auth/Correo.svelte";
</script>

<!--Página principal de la aplicación-->

<!--
Este es el componente principal, que nos redirigirá a "/" o página/componente de Login.

Si la URL consta de "/" es decir, página de login o "/registro" página de registro, 
se esconderá el componente Header.

Header se mostrará en el resto de páginas o componentes de la aplicación, por encima
de la sección principal que está dentro de <Router />.

En Router, almacenamos las rutas a los distintos componentes que actuarán como páginas diferentes, 
cuyo nombre está asociado a su funcionalidad.

-->

{#if location.pathname !== "/" && location.pathname !== "/registro" && location.pathname !== "/correo"}
  <!--HEADER contiene la lógica de control de la sesión de la APP. Acceder a HEADER para ver.-->
  <Header />
{/if}

<!--Si la página no es una página de la carpeta Auth, entonces se aplican unos estilos, y si es, otros.-->
<section
  class={location.pathname !== "/" &&
  location.pathname !== "/registro" &&
  location.pathname !== "/correo"
    ? "seccion-principal"
    : "seccion-principal-auth"}
>
  <Router>
    <!--Páginas de Auth:-->
    <Route path="/correo" component={Correo} />
    <Route path="/registro" component={Registro} />
    <Route path="/" component={Login} />

    <!--Páginas de Reserva:-->
    <Route path="/reserva" component={Reserva} />
    <Route path="/resumen" component={Resumen} />
    <Route path="/servicios" component={Servicios} />

    <!--Página de Inicio-->
    <Route path="/inicio" component={Inicio} />

    <!--Paginas de Información del usuario-->
    <Route path="/empresa" component={Empresa} />
    <Route path="/perfil" component={Perfil} />
    <Route path="/ver-citas" component={VerCitas} />
    <Route path="/notificaciones" component={Notificaciones} />

    <!--Páginas de usuarios con permisos superiores-->
    <Route path="/agenda" component={Agenda} />
  </Router>
</section>
