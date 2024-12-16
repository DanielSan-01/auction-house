import { login } from '../api/auth.js';
import { createApiKey } from '../api/auth.js';
import { navigate } from '../main.js';

export function LoginForm() {
  const form = document.createElement('form');
  form.id = 'loginForm';
  form.className = 'space-y-4 max-w-md mx-auto'; 


  const emailLabel = document.createElement('label');
  emailLabel.htmlFor = 'email';
  emailLabel.textContent = 'Email:';
  emailLabel.className = 'block text-sm font-medium text-gray-700';


  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'example@noroff.no';
  emailInput.required = true;
  emailInput.className =
    'bg-gray-100 border border-gray-300 text-sm rounded-sm block w-full p-2 lg:p-4';


  const passwordLabel = document.createElement('label');
  passwordLabel.htmlFor = 'password';
  passwordLabel.textContent = 'Password:';
  passwordLabel.className = 'block text-sm font-medium text-gray-700';


  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.name = 'password';
  passwordInput.placeholder = '••••••••';
  passwordInput.required = true;
  passwordInput.className =
    'bg-gray-100 border border-gray-300 text-sm rounded-sm block w-full p-2 lg:p-4';


  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Login';
  submitButton.className =
    'w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm';


  const errorMessage = document.createElement('p');
  errorMessage.id = 'error-message';
  errorMessage.className = 'text-red-500 text-sm text-center';


  form.append(
    emailLabel,
    emailInput,
    passwordLabel,
    passwordInput,
    submitButton,
    errorMessage
  );


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
}
