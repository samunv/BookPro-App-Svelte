window.addEventListener("DOMContentLoaded", function () {
  let url = "./../Controlador/reservarcontrolador.php";

  const ROOT_CSS = document.documentElement;  // El elemento :root
  comprobarSesion();
  
  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (!data.sesion) {
          alert("No hay sesión");
          window.location.href="login.php";
        }
      });
  }

  let btnContinuar1 = document.getElementById("btn-continuar-1");
  let listaHorarios = document.getElementById("lista-horarios");
  let formularioHora = document.getElementById("formulario-hora");
  let cajaProfesionales = document.getElementById("profesionales");

  let horaFinal = obtenerDatoTemporal("hora");
  let diaFinal = obtenerDatoTemporal("dia");
  let idServicio = obtenerDatoTemporal("idServicio");
  let mesFinal = obtenerDatoTemporal("mes");
  let añoFinal = obtenerDatoTemporal("año");

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Reservar";

  let imgFoto = document.getElementById("img-foto");
  imgFoto.src = obtenerDatoTemporal("foto");

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "" + obtenerDatoTemporal("nombre");

  let correoUsuario = document.getElementById("correo-usuario");
  let correo = obtenerDatoTemporal("correo");
  correoUsuario.textContent =
    correo.length > 20 ? correo.substring(0, 20) + "..." : correo;

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "elegirservicio.php";
  });

  // Inicialmente desactivar el botón
  desactivarBoton(btnContinuar1);

  // Variables de fecha
  const mesAño = document.getElementById("mes-año");
  const diasContenedor = document.getElementById("dias");
  let fecha = new Date();
  let diaActual = fecha.getDate();
  let mesActual = fecha.getMonth();
  let añoActual = fecha.getFullYear();

  let añoSeleccionado = añoActual;

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let mesSeleccionado = meses[mesActual];

  // Actualizar la visualización de la fecha
  function actualizarFecha() {
    mesAño.innerText = `${meses[mesActual]} ${añoActual}`;
    mesSeleccionado = meses[mesActual];
    añoSeleccionado = añoActual;
    guardarDatoTemporal("mes", mesSeleccionado);
    guardarDatoTemporal("año", añoSeleccionado);
  }

  // Obtener el último día del mes
  function obtenerUltimoDia(mes, año) {
    return new Date(año, mes + 1, 0).getDate();
  }

  // Obtener el día de la semana del primer día del mes
  function obtenerPrimerDiaSemana(mes, año) {
    return new Date(año, mes, 1).getDay();
  }

  // Generar los días del mes actual con los espacios vacíos
  function generarDiasDelMesActual(ultimoDia, primerDiaSemana) {
    let diasHTML = "";
    // Añadir días vacíos al inicio
    for (let i = 0; i < primerDiaSemana; i++) {
      diasHTML += "<div class='dia vacio'></div>";
    }
    // Añadir días del mes
    for (let i = 1; i <= ultimoDia; i++) {
      if (mesActual === fecha.getMonth() && i < diaActual) {
        diasHTML += "<div class='dia vacio'>" + i + "</div>"; // Días vacíos para días anteriores al actual
      } else {
        diasHTML += `<div class='dia numero' id='dia-numero${i}'>${i} </div>`;
      }
    }
    return diasHTML;
  }

  // Llenar el calendario
  function llenarCalendario() {
    actualizarFecha();
    const ultimoDia = obtenerUltimoDia(mesActual, añoActual);
    const primerDiaSemana = obtenerPrimerDiaSemana(mesActual, añoActual);
    let diasHTML = generarDiasDelMesActual(ultimoDia, primerDiaSemana);
    diasContenedor.innerHTML = diasHTML;
    elegirDia(ultimoDia);
  }

  // Navegar al mes siguiente
  function irAlMesSiguiente() {
    if (mesActual === 11) {
      mesActual = 0;
      añoActual++;
    } else {
      mesActual++;
    }
    llenarCalendario();
  }

  // Navegar al mes anterior
  function irAlMesAnterior() {
    if (comprobarMesActual()) {
      return;
    } else if (mesActual === 0) {
      mesActual = 11;
      añoActual--;
    } else {
      mesActual--;
    }

    llenarCalendario();
  }

  function comprobarMesActual() {
    // Comprobar si estamos en el mes y año actual para evitar retroceder
    if (añoActual === fecha.getFullYear() && mesActual === fecha.getMonth()) {
      return true;
    }
  }

  function comprobarHoraActual(horaString, diaSeleccionado) {
    const momento = new Date();
    const horaActual = momento.getHours();
    const minutosActuales = momento.getMinutes();
    const diaActual = momento.getDate();
    const mesActual = momento.getMonth();
    const añoActual = momento.getFullYear();

    // Comprobar si el día, mes y año seleccionados coinciden con el día actual
    if (
      diaSeleccionado === diaActual &&
      mesSeleccionado === meses[mesActual] &&
      añoSeleccionado === añoActual
    ) {
      // Separar hora y minutos de la hora proporcionada
      const [horas, minutos] = horaString.split(":").map(Number);

      // Comparar las horas y minutos
      if (
        horas < horaActual ||
        (horas === horaActual && minutos <= minutosActuales)
      ) {
        return false; // La hora es pasada
      }
    }

    return true; // La hora es válida
  }

  let btnMesAnterior = document.getElementById("mes-anterior");
  btnMesAnterior.addEventListener("click", irAlMesAnterior);
  let btnMesSiguiente = document.getElementById("mes-siguiente");
  btnMesSiguiente.addEventListener("click", irAlMesSiguiente);

  llenarCalendario();

  // Selección de días
  let diaSeleccionado = null; // Variable para almacenar el día seleccionado

  function elegirDia(ultimoDia) {
    for (let i = 1; i <= ultimoDia; i++) {
      let btnDia = document.getElementById("dia-numero" + i);
      if (btnDia) {
        btnDia.addEventListener("click", () => seleccionarDia(i));
      }
    }
  }

  function seleccionarDia(dia) {
    let profesionalSeleccionado = obtenerDatoTemporal(
      "idProfesionalSeleccionado"
    );
    if (profesionalSeleccionado === null) {
      return alert("Por favor, selecciona un profesional primero.");
    }

    if (diaSeleccionado !== null) {
      actualizarEstiloDia(diaSeleccionado, false); // Deseleccionar el día previo
    }

    actualizarEstiloDia(dia, true); // Seleccionar el nuevo día
    diaSeleccionado = dia;
    guardarDatoTemporal("dia", dia); // Guardar día seleccionado en sessionStorage
    obtenerHorasDisponibles(
      dia,
      mesSeleccionado,
      añoSeleccionado,
      profesionalSeleccionado
    ); // Obtener horas disponibles para el día seleccionado
  }

  function actualizarEstiloDia(dia, seleccionar) {
    let btnDia = document.getElementById("dia-numero" + dia);
    desactivarBoton(btnContinuar1);
    if (btnDia) {
      if (seleccionar) {
        btnDia.style.backgroundColor = obtenerTemaComplementario(ROOT_CSS);
        btnDia.style.color = obtenerTemaPrincipal(ROOT_CSS);
        btnDia.style.fontWeight = "bold";
      } else {
        btnDia.style.backgroundColor = "";
        btnDia.style.color = "";
        btnDia.style.fontWeight = "";
      }
    }
  }

  function desactivarBoton(boton) {
    boton.disabled = true;
    boton.style.backgroundColor = "grey";
  }

  function activarBoton(boton) {
    boton.disabled = false;
    boton.style.backgroundColor = "";
  }

  // Función para almacenar un dato en sessionStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }

  // Función para recuperar un dato de sessionStorage
  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  // Obtener horas disponibles para el día seleccionado
  function obtenerHorasDisponibles(dia, mes, año, idProfesional) {
    fetch(
      url +
        "?diaParaHorario=" +
        dia +
        "&mesParaHorario=" +
        mes +
        "&añoParaHorario=" +
        año +
        "&idProfesionalParaHorario=" +
        idProfesional
    )
      .then((response) => response.json())
      .then((data) => {
        mostrarHoras(data);
        elegirHora(data);
      });
  }

  function mostrarHoras(horas) {
    let html = "";
    const numeroDeCaracteres = 5;

    // Verificar si hay horas disponibles antes de recorrer las horas
    if (horas.length > 0) {
      // Recorrer las horas y mostrar las disponibles
      horas.forEach((hora) => {
        if (hora.hora && comprobarHoraActual(hora.hora, diaSeleccionado)) {
          // Verificar si la hora no está vacía
          html += `<li id='${hora.hora}'>${hora.hora.substring(
            0,
            numeroDeCaracteres
          )}</li>`;
        }
      });
    } else {
      html =
        "<p id='texto-no-horas'>No hay horas disponibles en el día seleccionado.<p>";
    }

    // Insertar el HTML generado en el contenedor de la lista de horarios
    listaHorarios.innerHTML = html;
  }

  let horaSeleccionada = null;

  function elegirHora(horas) {
    horas.forEach((hora) => {
      let btnHora = document.getElementById(hora.hora);
      if (btnHora) {
        btnHora.addEventListener("click", () => seleccionarHora(hora.hora));
        formularioHora.style.display = "flex";
      }
    });
  }

  function seleccionarHora(hora) {
    if (horaSeleccionada !== null) {
      actualizarEstiloHora(horaSeleccionada, false); // Deseleccionar la hora previa
    }

    actualizarEstiloHora(hora, true); // Actualizar el estilo de la nueva hora seleccionada
    horaSeleccionada = hora;
    console.log("Hora seleccionada: ", hora); // Debugging
    guardarDatoTemporal("hora", horaSeleccionada); // Guardar hora seleccionada en sessionStorage
    activarBoton(btnContinuar1);
  }

  function actualizarEstiloHora(hora, seleccionar) {
    let btnHora = document.getElementById(hora);
    if (btnHora) {
      if (seleccionar) {
        btnHora.style.backgroundColor = obtenerTemaPrincipal(ROOT_CSS);
        btnHora.style.color = "#fff";
        btnHora.style.border = "2px solid " + obtenerTemaPrincipal(ROOT_CSS);
      } else {
        btnHora.style.backgroundColor = "";
        btnHora.style.color = "";
        btnHora.style.border = "";
      }
    }
  }

  btnContinuar1.addEventListener("click", function () {
    horaFinal = obtenerDatoTemporal("hora"); // Asegurarse de que se obtenga la hora más actualizada
    diaFinal = obtenerDatoTemporal("dia"); // Asegurarse de que se obtenga el día más actual
    idProfesional = obtenerDatoTemporal("idProfesionalSeleccionado"); // Asegurarse de que se obtenga el profesional más actual
    mesFinal = obtenerDatoTemporal("mes");
    añoFinal = obtenerDatoTemporal("año");

    window.location.href = "resumen.php";
  });

  enviarIdServicio(idServicio);

  function enviarIdServicio(idServicio) {
    fetch(url + "?idServicioParaProfesionales=" + idServicio)
      .then((response) => response.json())
      .then((profesionales) => {
        imprimirProfesionales(profesionales);
      });
  }
  let profesionalSeleccionado = null;

  function imprimirProfesionales(profesionales) {
    let html = "";
    profesionales.forEach((profesional) => {
      html += `<div class='caja-profesional'>
           <div class='profesional' id='${profesional.idProfesional}' data-correo='${profesional.correo}'>
             <img src='${profesional.foto}' alt='' width='120' height='120'>
           </div>
           <p class='nombre'>${profesional.nombre}</p>
         </div>`;
    });
    cajaProfesionales.innerHTML = html;
    elegirProfesional();
    // Seleccionar automáticamente el primer profesional
    if (profesionales.length > 0) {
      seleccionarProfesional(profesionales[0].idProfesional);
    }
  }

  function elegirProfesional() {
    const divsProfesionales = document.querySelectorAll(".profesional");
    divsProfesionales.forEach((div) => {
      div.addEventListener("click", () => seleccionarProfesional(div.id));
    });
  }

  function seleccionarProfesional(id) {
    if (profesionalSeleccionado !== id) {
      let dia = obtenerDatoTemporal("dia");

      if (diaSeleccionado !== null) {
        obtenerHorasDisponibles(dia, mesSeleccionado, añoSeleccionado, id);
      }

      if (profesionalSeleccionado !== null) {
        actualizarEstiloProfesional(profesionalSeleccionado, false); // Deseleccionar el profesional previo
      }

      // Obtener el correo del profesional seleccionado
      let correoProfesional = document
        .getElementById(id)
        .getAttribute("data-correo");

      actualizarEstiloProfesional(id, true); // Actualizar el estilo del nuevo profesional seleccionado
      profesionalSeleccionado = id; // Guardar profesional seleccionado
      guardarDatoTemporal("idProfesionalSeleccionado", id); // Guardar en sessionStorage

      // Guardar el correo del profesional en sessionStorage
      guardarDatoTemporal("correoProfesional", correoProfesional);
    }
  }

  function actualizarEstiloProfesional(id, seleccionar) {
    let divProfesional = document.getElementById(id);
    if (divProfesional) {
      if (seleccionar) {
        divProfesional.style.border = "2px solid "+obtenerTemaPrincipal(ROOT_CSS);
        divProfesional.style.backgroundColor = obtenerTemaComplementario(ROOT_CSS);
      } else {
        divProfesional.style.border = "";
        divProfesional.style.backgroundColor = "";
      }
    }
  }

  

  function obtenerTemaPrincipal(root) {
    const estilo = getComputedStyle(root);  // Obtener el estilo computado
    const temaPrincipal = estilo.getPropertyValue('--tema-principal');  // Obtener el valor de la propiedad
    return temaPrincipal;
  }
  function obtenerTemaComplementario(root) {
   
    const estilo = getComputedStyle(root);  // Obtener el estilo computado
    const temaPrincipal = estilo.getPropertyValue('--color-secundario-complementario');  // Obtener el valor de la propiedad
    return temaPrincipal;
  }
});
