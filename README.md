# TP integrador Aplicaciones móviles híbridas

Esta aplicación móvil desarrollada en React Native con Expo permite cronometrar tareas y compartir ejecuciones con otros usuarios. La aplicación incluye funcionalidades como almacenamiento local y externo, autenticación con Firebase, geolocalización y notificaciones directas entre usuarios.

## Instalación y Ejecución

Para ejecutar la aplicación en tu dispositivo, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/CronoTaskApp.git
```

2. Moverse al directorio

```bash
cd CronoTaskApp
```

3. Instala las depencias necesarias

```bash
npm install
```

4. Inicializa el proyecto

```bash
npm start
```

## Cronograma de Entregas

- **Primer Entregable (30/4):** Mostrar un cronometro por pantalla, que tenga la siguiente funcionalidad: Inicio, Pausa, Resumir la pausa, Lapso y Reiniciar.
- **Segundo Entregable (7/5):** Almacenar diferentes corridas del cronómetro en el storage interno del dispositivo.
- **Tercer Entregable (21/5):** habilitar Geolocalización para registrar ubicación de las diferentes ejecuciones del cronómetro
- **Cuarto Entregable (4/6):** Intergrar Login y Almacenamiento externo
- **Quinto Entregable (11/6):** Recibir una notificación directa de un "contacto externo (y de confianza)" cuando este inicie y finalice su cronometro mediante el uso de Websockets con el objetivo que dicha comunicación no pase a través de servidores intermedios (conexión directa entre dispositivos)
