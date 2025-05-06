// Mock de usuarios para simular un sistema de autenticación
const mockUsers = [
    {
      username: "admin", // Nombre de usuario para el administrador
      password: "admin123", // Contraseña del administrador
      role: "admin", // Rol del usuario (admin)
      name: "Administrador", // Nombre completo
      phone: "000-000-0000", // Teléfono
      email: "admin@bloomly.com", // Correo electrónico
    },
    // Otros usuarios (con roles de 'viewer')
    {
      username: "mjordan",
      password: "123",
      role: "viewer",
      name: "Michael Jordan",
      phone: "555-111-2222",
      email: "mjordan@example.com",
    },
  ];
  
  // Mock de productos disponibles en la tienda
  let mockProducts = [
    {
      name: "Peperomia",
      price: 20,
      descripcion: "Planta de interior fácil de cuidar, ideal para principiantes.",
      imagen: "./img/image-peperomia.png",
    },
    {
      name: "Bonsai",
      price: 19,
      descripcion: "Planta de interior que requiere cuidados especiales.",
      imagen: "./img/image-bonsai.png",
    },
  ];
  
  // Referencias a los elementos del DOM donde se mostrarán el rol y nombre del usuario
  const userRoleElement = document.getElementById("userRole");
  const userNameElement = document.getElementById("userName");
  
  // Función que se ejecuta al cargar la página para mostrar la información del usuario
  function loadUserData() {
    // Recupera el usuario almacenado en el localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("No estás logueado."); // Si no hay usuario, alerta y redirige
      window.location.href = "index.html";
      return;
    }
  
    // Muestra el rol y nombre del usuario
    userRoleElement.textContent = `Rol: ${user.role === "admin" ? "Admin" : "Viewer"}`;
    userNameElement.textContent = `Nombre: ${user.name}`;
  
    // Muestra contenido según el rol del usuario
    if (user.role === "admin") {
      document.getElementById("admin-panel").style.display = "block"; // Muestra el panel de administración
      showUserList(); // Muestra la lista de usuarios
    } else {
      showViewerPanel(user); // Muestra el panel de visualización
    }
  
    // Muestra solo los elementos visibles para el rol del usuario
    document.querySelectorAll('[data-visible-for]').forEach(el => {
      const roles = el.dataset.visibleFor.split(' ');
      if (!roles.includes(user.role)) {
        el.style.display = 'none'; // Oculta los elementos que no corresponden al rol
      }
    });
  
    renderProducts(user.role); // Renderiza los productos según el rol del usuario
  }
  
  // Función de login que valida al usuario con los datos de 'mockUsers'
  function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Busca un usuario con el correo y contraseña proporcionados
    const user = mockUsers.find(
      u => (u.username === email || email.includes("@")) && u.password === password
    );
  
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Almacena el usuario en el localStorage
      window.location.href = "home.html"; // Redirige al usuario al panel principal
    } else {
      alert("Usuario o contraseña incorrectos."); // Si no se encuentra el usuario, muestra alerta
    }
  }
  
  // Función de logout que elimina el usuario del localStorage y redirige al login
  function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html"; // Redirige al login
  }
  
  // Función para renderizar los productos en la vista
  function renderProducts(role) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = ""; // Limpiar contenido previo
  
    // Recorre el array de productos mock y genera elementos HTML para mostrarlos
    mockProducts.forEach(p => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.name}" style="width: 100%; height: auto; border-radius: 8px;"/>
        <h4>${p.name}</h4>
        <p><strong>Precio:</strong> $${p.price}</p>
        <p>${p.descripcion}</p>
      `;
  
      if (role === "viewer") { // Si el usuario es un 'viewer', agrega el botón de compra
        const btn = document.createElement("button");
        btn.innerText = "Comprar";
        btn.onclick = () => alert(`¡Gracias por comprar ${p.name}!`);
        div.appendChild(btn);
      }
  
      grid.appendChild(div); // Añade el producto a la grilla
    });
  }
  
  // Función para agregar una nueva planta al sistema (solo disponible para admins)
  function addPlant() {
    const name = document.getElementById("newPlantName").value.trim();
    const price = parseFloat(document.getElementById("newPlantPrice").value.trim());
    const description = document.getElementById("newPlantDescription").value.trim();
    const image = document.getElementById("newPlantImage").value.trim();
  
    // Verifica si todos los campos están completos
    if (!name || isNaN(price) || !description || !image) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }
  
    // Agrega la nueva planta al array de mockProducts
    mockProducts.push({ name, price, descripcion: description, imagen: image });
  
    // Limpia los campos de entrada
    document.getElementById("newPlantName").value = "";
    document.getElementById("newPlantPrice").value = "";
    document.getElementById("newPlantDescription").value = "";
    document.getElementById("newPlantImage").value = "";
  
    alert("Planta agregada correctamente.");
    renderProducts("admin"); // Renderiza los productos de nuevo
  }
  
  // Función para mostrar la lista de usuarios registrados (solo para admins)
  function showUserList() {
    const table = document.getElementById("userListTable");
    table.innerHTML = ""; // Limpiar la tabla
  
    // Filtra los usuarios con rol 'viewer' y los agrega a la tabla
    mockUsers.filter(u => u.role === "viewer").forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.name}</td>
        <td>${u.role}</td>
        <td>${u.phone}</td>
        <td>${u.email}</td>
        <td>
          <button onclick="editUser('${u.username}')">Editar</button>
          <button onclick="deleteUser('${u.username}')">Eliminar</button>
        </td>
      `;
      table.appendChild(tr); // Añade cada usuario a la tabla
    });
  }
  
  // Función para mostrar una sección específica del panel admin (Plantas, Usuarios, etc.)
  function showSection(sectionId) {
    document.querySelectorAll(".admin-section").forEach(s => s.style.display = "none");
    const section = document.getElementById(`section-${sectionId}`);
    if (section) section.style.display = "block"; // Muestra la sección correspondiente
  
    // Llama funciones adicionales según la sección seleccionada
    if (sectionId === "plantas") renderAdminPlants();
    if (sectionId === "usuarios") showUserList();
  }
  
  // Función para renderizar la lista de plantas en el panel de administración
  function renderAdminPlants() {
    const grid = document.getElementById("adminPlantGrid");
    grid.innerHTML = ""; // Limpiar contenido previo
  
    // Recorre los productos y los muestra en el panel admin
    mockProducts.forEach(p => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.name}" style="width: 100%; height: auto; border-radius: 8px;"/>
        <h4>${p.name}</h4>
        <p><strong>Precio:</strong> $${p.price}</p>
        <p>${p.descripcion}</p>
      `;
      grid.appendChild(div); // Añade la planta a la grilla
    });
  }
  
  // Función para mostrar el panel del 'viewer' (usuario normal)
  function showViewerPanel(user) {
    document.getElementById("viewer-panel").style.display = "block"; // Muestra el panel de visualización
    document.getElementById("admin-panel").style.display = "none"; // Oculta el panel de administración
    renderProducts(user.role); // Renderiza los productos para el usuario
  }
  
  // Función para agregar un producto al carrito (solo simulación)
  function addToCart(plantName) {
    alert(`Simulación: ${plantName} agregada al carrito 🛒`);
  }
  
  // Funciones para editar o eliminar usuarios (solo simulación)
  function editUser(username) {
    alert(`Simulación: editar usuario ${username}`);
  }
  
  function deleteUser(username) {
    alert(`Simulación: eliminar usuario ${username}`);
  }
  
  // Funciones para mostrar secciones como "Mis Plantas", "Nosotros" y "Contacto"
  function showMisPlantas() {
    toggleView("viewer-panel");
  }
  
  function showNosotros() {
    toggleView("nosotros-section");
  }
  
  function showContacto() {
    toggleView("contacto-section");
  }
  
  // Función para alternar la visibilidad de las secciones
  function toggleView(sectionId) {
    const sections = ["admin-panel", "viewer-panel", "nosotros-section", "contacto-section"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === sectionId ? "block" : "none"; // Muestra u oculta la sección correspondiente
    });
  }
  