import { RegisterForm } from '../components/registerForm.js';

export function RegisterPage() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = "register-page-container flex flex-col items-center justify-center min-h-screen";

  const title = document.createElement('h2');
  title.textContent = 'Register';
  title.className = 'text-2xl font-bold mb-4';
  container.appendChild(title);

  const form = RegisterForm();
  container.appendChild(form);

  const loginLink = document.createElement('p');
  loginLink.innerHTML = `
    Already have an account? <a href="/login" class="text-blue-500 hover:underline">Login here</a>.
  `;
  container.appendChild(loginLink);

  app.appendChild(container);
}
