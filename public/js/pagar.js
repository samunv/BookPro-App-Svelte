window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  var stripe = Stripe(
    "pk_test_51QeJlX03SQGnqkUoWQrPF3aP1CIHC56lKMxORN7tF8CBxMbxhsG341CPWuXOOT0upKqdueQL5ge7UilvIKjyKymA003vKOzgTQ"
  );
  var elements = stripe.elements();
  var card = elements.create("card");
  card.mount("#card-element");

  var correoInput = this.document.getElementById("correo-input");
  const titularForm = this.document.getElementById("titular-form");

  // Parámetros de la URL recibida
  const parametros = new URLSearchParams(window.location.search);
  const datos = JSON.parse(decodeURIComponent(parametros.get("datos")));
  let idCita = parametros.get("idCita");

  const precioDelServicio = Math.round(datos.precio * 100);
  const duracionDelServicio = datos.duracion;
  const correoDelCliente = datos.correoCliente;
  correoInput.value = datos.correoCliente;

  var nombreCompletoDelTitular = obtenerNombreCliente(titularForm);

  function obtenerNombreCliente(formulario) {
    const nombre = formulario.querySelector("[name='nombre']").value || "";
    const apellido = formulario.querySelector("[name='apellido']").value || "";
    return `${nombre} ${apellido}`.trim();
  }

  // Validar si todos los campos del formulario están completos
  function validarFormulario() {
    const nombreCompletoTitular = obtenerNombreCliente(titularForm);
    const correo = correoInput.value;

    if (!nombreCompletoTitular || !correo) {
      alert("Por favor, completa todos los campos.");
      return false;
    }
    return true;
  }

  var form = document.getElementById("payment-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Paso 1: Crear un PaymentMethod antes de enviar a PHP
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
      billing_details: {
        name: nombreCompletoDelTitular,
        email: correoDelCliente,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Paso 2: Enviar datos al backend
    fetch("./../Controlador/pagos-stripe-controlador.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: precioDelServicio,
        currency: "eur",
        customer_name: nombreCompletoDelTitular,
        customer_email: correoDelCliente,
        payment_method_id: paymentMethod.id, // ID del método de pago
        idCita: idCita,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Paso 3: Confirmar el pago con Stripe
          stripe.confirmCardPayment(data.clientSecret).then(function (result) {
            if (result.error) {
              alert(result.error.message);
            } else {
              if (result.paymentIntent.status === "succeeded") {
                alert("Pago exitoso");
                window.location.href = "index.php";
              }
            }
          });
        } else {
          alert(data.error);
        }
      });
  });

 
  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (!data.sesion) {
          alert("No hay sesión");
          window.location.href = "login.php";
        }
      });
  }
});
