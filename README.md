# Backend Coder 3

Este es un proyecto de backend desarrollado como parte del curso de Coderhouse. Utiliza Node.js, Express y MongoDB para gestionar una API RESTful orientada a un ecommerce con productos, carritos y autenticación de usuarios.
Podes probar la aplicacion en https://my-app-3vvy.onrender.com/api/products

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **Docker**
- **JWT (Passport)**
- **Handlebars** (para vistas)
- **Socket.IO** (para comunicación en tiempo real)

## Funcionalidades principales

- Gestión de productos (crear, leer, actualizar, eliminar).
- Gestión de carritos de compra.
- Registro y login de usuarios con JWT.
- Autenticación con Passport.
- Conexión a base de datos MongoDB.
- Plantillas dinámicas con Handlebars.
- Uso de WebSockets con Socket.IO.
- Imagen Docker lista para desplegar.

## Instalación local

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/francocaraballo/backend-coder-3.git
   cd backend-coder-3
   ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. onfigurá las variables de entorno en un archivo .env (puede incluir puerto, URI de Mongo, claves JWT, etc.).

4. Ejecutá el servidor en modo desarrollo:

    ```bash
    npm run dev
    ```
        
## Uso con Docker
Podés correr el proyecto directamente usando Docker. La imagen está publicada en Docker Hub.

### Imagen Docker
📦 Docker Hub: https://hub.docker.com/r/francocrbl/my-app

## Comando para correr con Docker
    ```
    docker pull francocaraballo/backend-coder-3
    docker run -p 8080:8080 francocaraballo/backend-coder-3
    ```

Asegurate de tener configuradas las variables de entorno necesarias mediante un archivo .env o con el parámetro -e en el comando docker run.
