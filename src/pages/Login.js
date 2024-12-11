import { LoginForm } from '../components/loginForm.js';

export function LoginPage() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = "login-page-container flex flex-col items-center justify-center min-h-screen"

  const title = document.createElement('h2');
  title.textContent = 'Login';
  title.className = 'text-2xl font-bold mb-4';
  container.appendChild(title);

  const form = LoginForm();
  container.appendChild(form);

  const registerLink = document.createElement('p');
  registerLink.innerHTML = `
    Don't have an account? <a href="/register" class="text-blue-500 hover:underline">Register here</a>.
  `;
  container.appendChild(registerLink);

  app.appendChild(container);
}