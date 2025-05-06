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

// Función de login que valida al usuario con los datos de 'mockUsers'
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Busca un usuario con el correo y contraseña proporcionados
  const user = mockUsers.find(
    (u) =>
      (u.username === email || email.includes("@")) && u.password === password
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user)); // Almacena el usuario en el localStorage
    window.location.href = "home.html"; // Redirige al usuario al panel principal
  } else {
    alert("Usuario o contraseña incorrectos."); // Si no se encuentra el usuario, muestra alerta
  }
}
