/*
  GOOGLE APPS SCRIPT - Backend gratuito para guardar leads en Google Sheets

  PASOS:
  1. Crea un Google Sheet.
  2. Copia el ID del archivo desde la URL.
     Ejemplo:
     https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
  3. Pega ese ID en SHEET_ID.
  4. Ve a Extensiones > Apps Script.
  5. Borra el código que aparece y pega todo este archivo.
  6. Clic en Implementar > Nueva implementación.
  7. Tipo: Aplicación web.
  8. Ejecutar como: Tú.
  9. Quién tiene acceso: Cualquier usuario.
  10. Autoriza los permisos.
  11. Copia la URL de la aplicación web.
  12. Pega esa URL en assets/js/app.js, en la variable GOOGLE_SCRIPT_URL.
*/

const SHEET_ID = "PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET";

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const payload = JSON.parse(e.postData.contents || "{}");
    const tipo = payload.tipo || "";

    if (tipo !== "comprador" && tipo !== "ofertante") {
      throw new Error("Tipo de lead inválido.");
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);

    if (tipo === "comprador") {
      const sheet = obtenerHojaCompradores(ss);
      const d = payload.datos || {};

      sheet.appendRow([
        new Date(),
        d.operacion || "",
        d.tipoInmueble || "",
        d.ciudad || "",
        d.zona || "",
        d.presupuesto || "",
        d.moneda || "",
        d.tiempoBusqueda || "",
        d.dormitorios || "",
        d.banos || "",
        d.formaPago || "",
        Array.isArray(d.caracteristicas) ? d.caracteristicas.join(", ") : (d.caracteristicas || ""),
        d.comentario || "",
        d.nombre || "",
        d.whatsapp || "",
        d.email || ""
      ]);
    }

    if (tipo === "ofertante") {
      const sheet = obtenerHojaOfertantes(ss);
      const d = payload.datos || {};

      sheet.appendRow([
        new Date(),
        d.nombreEmpresa || "",
        d.tipoOfertante || "",
        d.ciudadTrabajo || "",
        d.zonasTrabajo || "",
        d.tipoPropiedades || "",
        d.operacionManeja || "",
        d.cantidadPropiedades || "",
        d.recibirSolicitudes || "",
        d.datosListos || "",
        d.comentarioEmpresa || "",
        d.whatsappEmpresa || "",
        d.emailEmpresa || ""
      ]);
    }

    lock.releaseLock();

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        message: "Lead guardado correctamente"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function obtenerHojaCompradores(ss) {
  const nombre = "Compradores";
  let sheet = ss.getSheetByName(nombre);

  if (!sheet) {
    sheet = ss.insertSheet(nombre);
    sheet.appendRow([
      "Fecha",
      "Operación",
      "Tipo de inmueble",
      "Ciudad",
      "Zona",
      "Presupuesto",
      "Moneda",
      "Tiempo de búsqueda",
      "Dormitorios",
      "Baños",
      "Forma de pago",
      "Características",
      "Comentario",
      "Nombre",
      "WhatsApp",
      "Email"
    ]);
  }

  return sheet;
}

function obtenerHojaOfertantes(ss) {
  const nombre = "Ofertantes";
  let sheet = ss.getSheetByName(nombre);

  if (!sheet) {
    sheet = ss.insertSheet(nombre);
    sheet.appendRow([
      "Fecha",
      "Nombre/Inmobiliaria",
      "Tipo de ofertante",
      "Ciudad",
      "Zonas",
      "Tipo de propiedades",
      "Operación",
      "Propiedades activas",
      "Desea recibir solicitudes",
      "Tiene fotos/datos listos",
      "Comentario",
      "WhatsApp",
      "Email"
    ]);
  }

  return sheet;
}
