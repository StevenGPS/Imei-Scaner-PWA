# Escáner IMEI (PWA)

App web para escanear IMEIs (código de barras / QR) con la cámara del celular, validar con Luhn, detectar duplicados y exportar a Excel/CSV.

- Sin build: HTML + JS estático.
- Requiere HTTPS para la cámara (Netlify lo da por defecto).
- Instalable en Android: Chrome → menú ⋮ → "Instalar app" / "Agregar a pantalla principal".
- Los datos se guardan en el navegador del dispositivo (localStorage). Exporta antes de borrar datos del navegador.

## Despliegue en Netlify
Conectar el repo en Netlify → sin comando de build → directorio de publicación `.` (ya definido en `netlify.toml`).

## Probar localmente
```
npx serve .
```
(la cámara solo funciona en `localhost` o HTTPS)
