# Conectar formularios a Google Sheets gratis

Este proyecto ya viene preparado para guardar los formularios en Google Sheets usando Google Apps Script.

## 1. Crear la base de datos

1. Entra a Google Sheets.
2. Crea una hoja nueva.
3. Ponle un nombre, por ejemplo: `Leads Inmobiliarios`.
4. Copia el ID del archivo desde la URL.

Ejemplo de URL:

```txt
https://docs.google.com/spreadsheets/d/1ABCDEF1234567890/edit
```

El ID sería:

```txt
1ABCDEF1234567890
```

## 2. Crear el backend gratuito

1. En tu Google Sheet, entra a `Extensiones > Apps Script`.
2. Borra el código que aparece.
3. Abre el archivo del proyecto:

```txt
backend/google-apps-script.gs
```

4. Copia todo ese código y pégalo en Apps Script.
5. Busca esta línea:

```js
const SHEET_ID = "PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET";
```

6. Cambia el texto por el ID real de tu Google Sheet.

## 3. Publicar la API

1. En Apps Script, haz clic en `Implementar`.
2. Clic en `Nueva implementación`.
3. En tipo, selecciona `Aplicación web`.
4. En `Ejecutar como`, selecciona `Yo`.
5. En `Quién tiene acceso`, selecciona `Cualquier usuario`.
6. Autoriza los permisos.
7. Copia la URL que termina en `/exec`.

## 4. Conectar la web

Abre este archivo:

```txt
assets/js/app.js
```

Busca esta línea:

```js
const GOOGLE_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
```

Pega ahí tu URL de Apps Script.

Ejemplo:

```js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxxxxxxxxxx/exec";
```

## 5. Probar

1. Abre `comprador.html`.
2. Llena el formulario.
3. Envía.
4. Revisa tu Google Sheet.

El sistema creará automáticamente estas hojas:

- `Compradores`
- `Ofertantes`

## Importante

Este método es excelente para validar el MVP gratis. Para una app grande con usuarios, login, panel administrativo y seguridad avanzada, conviene pasar después a Supabase, Firebase o una base de datos propia.
