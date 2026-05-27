/*
  Archivo JavaScript común para los formularios.

  CONFIGURACIÓN 1: WhatsApp
  Cambia este número por tu WhatsApp real en formato internacional:
  - Sin +
  - Sin espacios
  - Con código de país
*/
const WHATSAPP_DESTINO = "51997051720";

/*
  CONFIGURACIÓN 2: Google Sheets mediante Google Apps Script

  1. Crea tu Google Sheet.
  2. Pega el código de backend/google-apps-script.gs en Apps Script.
  3. Implementa como aplicación web.
  4. Copia la URL de implementación.
  5. Pégala aquí abajo.

  Ejemplo:
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec";
*/
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFXYawVBgvl7yz9QcytQwXnvlsHPjLSI8RXW4irwwS-mtn2oFnXp9sf4IxpTUtv8QadA/exec";

function obtenerDatosFormulario(formulario) {
  const formData = new FormData(formulario);
  const datos = {};

  formData.forEach((valor, clave) => {
    if (datos[clave]) {
      if (!Array.isArray(datos[clave])) {
        datos[clave] = [datos[clave]];
      }
      datos[clave].push(valor);
    } else {
      datos[clave] = valor;
    }
  });

  return datos;
}

function valor(datos, campo) {
  return datos[campo] && String(datos[campo]).trim() !== "" ? datos[campo] : "No especificado";
}

function guardarLeadLocal(tipo, datos) {
  const leads = JSON.parse(localStorage.getItem("leadsInmobiliarios")) || [];
  leads.push({
    tipo,
    datos,
    fechaRegistro: new Date().toISOString()
  });

  localStorage.setItem("leadsInmobiliarios", JSON.stringify(leads));
}

async function guardarLeadEnGoogleSheets(tipo, datos) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT") {
    console.warn("No se configuró GOOGLE_SCRIPT_URL. El lead solo se guardó en localStorage.");
    return;
  }

  const payload = {
    tipo,
    datos,
    fechaRegistro: new Date().toISOString()
  };

  /*
    Usamos mode: "no-cors" para evitar bloqueos CORS en Apps Script.
    En este modo no podemos leer la respuesta del servidor, pero el envío funciona.
  */
  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });
}

function abrirWhatsApp(mensaje) {
  const url = `https://wa.me/${WHATSAPP_DESTINO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function validarBootstrap(formulario) {
  if (!formulario.checkValidity()) {
    formulario.classList.add("was-validated");
    return false;
  }

  formulario.classList.add("was-validated");
  return true;
}

function configurarFormularioComprador() {
  const formulario = document.getElementById("formComprador");
  if (!formulario) return;

  formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    if (!validarBootstrap(formulario)) return;

    const datos = obtenerDatosFormulario(formulario);
    const caracteristicas = Array.isArray(datos.caracteristicas)
      ? datos.caracteristicas.join(", ")
      : valor(datos, "caracteristicas");

    const mensaje =
`NUEVA SOLICITUD DE CLIENTE

Operación: ${valor(datos, "operacion")}
Tipo de inmueble: ${valor(datos, "tipoInmueble")}
Ciudad: ${valor(datos, "ciudad")}
Zona: ${valor(datos, "zona")}
Presupuesto máximo: ${valor(datos, "presupuesto")} ${valor(datos, "moneda")}
Tiempo de búsqueda: ${valor(datos, "tiempoBusqueda")}
Dormitorios: ${valor(datos, "dormitorios")}
Baños: ${valor(datos, "banos")}
Forma de pago: ${valor(datos, "formaPago")}
Características: ${caracteristicas}
Comentario: ${valor(datos, "comentario")}

DATOS DEL CLIENTE
Nombre: ${valor(datos, "nombre")}
WhatsApp: ${valor(datos, "whatsapp")}
Email: ${valor(datos, "email")}`;

    guardarLeadLocal("comprador", datos);

    const boton = formulario.querySelector("button[type='submit']");
    const textoOriginal = boton.innerText;
    boton.disabled = true;
    boton.innerText = "Guardando...";

    try {
      await guardarLeadEnGoogleSheets("comprador", datos);

      const alerta = document.getElementById("mensajeExitoComprador");
      if (alerta) alerta.classList.remove("d-none");

      abrirWhatsApp(mensaje);
      formulario.reset();
      formulario.classList.remove("was-validated");
    } catch (error) {
      alert("No se pudo guardar en Google Sheets. Revisa la URL de Apps Script.");
      console.error(error);
    } finally {
      boton.disabled = false;
      boton.innerText = textoOriginal;
    }
  });
}

function configurarFormularioOfertante() {
  const formulario = document.getElementById("formOfertante");
  if (!formulario) return;

  formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    if (!validarBootstrap(formulario)) return;

    const datos = obtenerDatosFormulario(formulario);

    const mensaje =
`NUEVO REGISTRO DE OFERTANTE

Nombre/Inmobiliaria: ${valor(datos, "nombreEmpresa")}
Tipo de ofertante: ${valor(datos, "tipoOfertante")}
Ciudad donde trabaja: ${valor(datos, "ciudadTrabajo")}
Zonas que maneja: ${valor(datos, "zonasTrabajo")}
Tipo de propiedades: ${valor(datos, "tipoPropiedades")}
Operación que maneja: ${valor(datos, "operacionManeja")}
Propiedades activas aprox.: ${valor(datos, "cantidadPropiedades")}
Desea recibir solicitudes: ${valor(datos, "recibirSolicitudes")}
Tiene fotos/datos listos: ${valor(datos, "datosListos")}
Comentario: ${valor(datos, "comentarioEmpresa")}

DATOS DE CONTACTO
WhatsApp: ${valor(datos, "whatsappEmpresa")}
Email: ${valor(datos, "emailEmpresa")}`;

    guardarLeadLocal("ofertante", datos);

    const boton = formulario.querySelector("button[type='submit']");
    const textoOriginal = boton.innerText;
    boton.disabled = true;
    boton.innerText = "Guardando...";

    try {
      await guardarLeadEnGoogleSheets("ofertante", datos);

      const alerta = document.getElementById("mensajeExitoOfertante");
      if (alerta) alerta.classList.remove("d-none");

      abrirWhatsApp(mensaje);
      formulario.reset();
      formulario.classList.remove("was-validated");
    } catch (error) {
      alert("No se pudo guardar en Google Sheets. Revisa la URL de Apps Script.");
      console.error(error);
    } finally {
      boton.disabled = false;
      boton.innerText = textoOriginal;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  configurarFormularioComprador();
  configurarFormularioOfertante();
});
