<<<<<<< HEAD
# Solicitudes Inmobiliarias - MVP con Bootstrap

Este proyecto contiene formularios separados para validar una idea de plataforma inmobiliaria basada en solicitudes de clientes.

## Archivos

- `index.html`: Página de inicio.
- `comprador.html`: Formulario para personas que quieren comprar, alquilar, buscar anticrético o cotizar.
- `ofertante.html`: Formulario para propietarios, agentes, inmobiliarias o constructoras.
- `assets/css/styles.css`: Estilos personalizados.
- `assets/js/app.js`: Lógica de envío por WhatsApp y guardado local.

## Cambiar número de WhatsApp

Abre:

`assets/js/app.js`

Cambia esta línea:

```js
const WHATSAPP_DESTINO = "59170000000";
```

Usa tu número con código de país, sin `+`, sin espacios.

Ejemplos:

- Bolivia: `59170000000`
- Colombia: `573001112233`
- Perú: `51999999999`

## Cómo probar

1. Abre `index.html` en tu navegador.
2. Entra a cualquiera de los formularios.
3. Llena los datos.
4. Al enviar, se abrirá WhatsApp con el mensaje listo.

## Nota

Este MVP todavía no guarda datos en una base de datos real. Solo guarda una copia temporal en el navegador usando `localStorage`.
Para producción, lo ideal sería conectar los formularios a Google Sheets, Airtable, Firebase, Supabase o una base de datos propia.
=======
# formulario
formularioInmobiliario
>>>>>>> 3432074c3c3994061ac663a96592f32ae7859cf3
