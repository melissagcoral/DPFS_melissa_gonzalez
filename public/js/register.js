document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const errorMsg = document.getElementById('registerError');
    const successMsg = document.getElementById('registerSuccess');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      errorMsg.textContent = '';
      successMsg.textContent = '';
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;
  
      if (!name || !email || !password || !confirmPassword) {
        errorMsg.textContent = 'Todos los campos son obligatorios.';
        return;
      }
  
      if (password.length < 6) {
        errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }
  
      if (password !== confirmPassword) {
        errorMsg.textContent = 'Las contraseñas no coinciden.';
        return;
      }
  
      // Simular éxito (a futuro enviará al servidor)
      successMsg.textContent = '¡Registro exitoso! Ahora podés iniciar sesión.';
      form.reset();
    });
  });
  