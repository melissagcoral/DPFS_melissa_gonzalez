document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const error = document.getElementById('loginError');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const email = form.email.value.trim();
      const password = form.password.value.trim();
  
      const validEmail = 'usuario@glowup.com';
      const validPassword = '123456';
  
      if (email === validEmail && password === validPassword) {
        window.location.href = '/';
      } else {
        error.textContent = 'Correo o contraseña incorrectos.';
      }
    });
  });
  