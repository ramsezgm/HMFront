# HOLA MODA - Dashboard

Este es un dashboard para gestionar información de clientes y compras, desarrollado con **Next.js**, **Material-UI** y **TypeScript**.

## Descripción

Este proyecto permite visualizar, agregar, editar y eliminar datos relacionados con **clientes** y **compras** a través de una interfaz limpia y moderna. Las funcionalidades incluyen:

- Visualización de todos los clientes.
- Visualización de todas las compras.
- Detalles de clientes y compras mediante modales.
- Eliminar clientes y compras.

## Tecnologías

- **Frontend:** Next.js (App Router), TypeScript, Material-UI
- **Backend:** API RESTful (consumo desde el frontend)
- **Estado:** React (useState, useEffect)
- **Estilos:** Material-UI, iconos de Material Design

## Funcionalidades

### 1. **Clientes**
  - Mostrar listado de clientes con detalles como:
    - ID
    - Edad
    - Género
    - Estado de suscripción
  - Modal para ver detalles del cliente.
  - Modal para eliminar clientes.

### 2. **Compras**
  - Mostrar listado de compras con detalles como:
    - ID de compra
    - Monto
    - ID de cliente
    - Nombre del artículo
  - Modal para ver detalles de compra.
  - Modal para eliminar compras.
  - 
### 3. *Dashboard**
  - Muestreo de los items mas vendidos.
  - Grafico de ventas por ubicacion.

## Instalación

### Clonar el repositorio

1. Clona el repositorio a tu máquina local:
    ```bash
    git clone https://github.com/ramsezgm/HMFront.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd frontend
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

    El dashboard estará disponible en `http://localhost:3000`.

