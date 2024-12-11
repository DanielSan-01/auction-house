import { login } from '../api/auth.js';
import { createApiKey } from '../api/auth.js';
import { navigate } from '../main.js';

export function LoginForm() {
  const form = document.createElement('form');
  form.id = 'loginForm';

  const emailLabel = document.createElement('label');
  emailLabel.for = 'email';
  emailLabel.textContent = 'Email:';
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  emailInput.required = true;

  const passwordLabel = document.createElement('label');
  passwordLabel.for = 'password';
  passwordLabel.textContent = 'Password:';
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.name = 'password';
  passwordInput.required = true;

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Login';

  const errorMessage = document.createElement('p');
  errorMessage.id = 'error-message';

  form.append(emailLabel, emailInput, passwordLabel, passwordInput, submitButton, errorMessage);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    try {
      const res = await login(email, password);
  
      if (res.success) {
        const accessToken = res.data.accessToken;
        const apiKeyRes = await createApiKey(accessToken);
  
        if (apiKeyRes.data && apiKeyRes.data.key) {
          localStorage.setItem('apiKey', apiKeyRes.data.key);
        }
  
        navigate('/');
      } else {
        errorMessage.innerText = res.message;
      }
    } catch (error) {
      errorMessage.innerText = 'Error logging in.';
      console.error(error);
    }
  });
  return form;
};