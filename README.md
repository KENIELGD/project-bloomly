# Bloomly

**Bloomly** es una tienda web de venta de plantas que simula un sistema de roles para usuarios: visitantes (viewer) y administradores (admin). Los visitantes pueden explorar y comprar plantas, mientras que los administradores pueden agregar nuevas plantas y gestionar usuarios.

---

## Características

- **Roles y permisos**
  - **Viewer (visitante):** Navegar catálogo de plantas, agregar al carrito.
  - **Admin (administrador):** Ver lista de plantas, agregar nuevas, ver y gestionar usuarios.

- **Páginas principales**
  - **Home:** Panel diferenciado según rol.
  - **Login / Registro:** Autenticación simulada con datos en `localStorage`.
  - **Nosotros:** Información de la empresa.
  - **Contacto:** Formulario de contacto.

- **UI interactiva**
  - Menú desplegable de usuario.
  - Iconos Feather.
  - Botón flotante de WhatsApp.

---

## Estructura de Archivos

```plaintext
├── index.html          # Login
├── register.html       # Registro de usuarios
├── home.html           # Página principal (panel admin o viewer)
├── style.css           # Estilos generales
├── script.js           # Lógica JS (autenticación, renderizado, CRUD simulado)
├── img/                # Imágenes (plantas, logo, sección Nosotros)
└── README.md           # Documentación del proyecto
