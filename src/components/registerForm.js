import { register } from '../api/auth.js';

export function RegisterForm() {
  const form = document.createElement('form');
  form.id = 'registerForm';

  const nameLabel = document.createElement('label');
  nameLabel.for = 'name';
  nameLabel.textContent = 'Name:';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.required = true;

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
  submitButton.textContent = 'Register';

  const errorMessage = document.createElement('p');
  errorMessage.id = 'error-message';

  form.append(nameLabel, nameInput, emailLabel, emailInput, passwordLabel, passwordInput, submitButton, errorMessage);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    try {
      const res = await register(name, email, password);
      const errorMessage = form.querySelector('#error-message');
      if (res.accessToken) {
        alert('Registration successful!');
      } else {
        errorMessage.innerText = 'Registration failed.';
      }
    } catch (error) {
      form.querySelector('#error-message').innerText = 'Error registering.';
    }
  });

  return form;
}