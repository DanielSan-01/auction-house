import { API_BASE_URL } from './config.js';


export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });
  const data = await res.json();


  if (res.ok && data.data) {
    const user = data.data;
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('userName', user.name);
    return { success: true, data: user };
  } else {
    console.error('Login failed:', data);
    return {
      success: false,
      message: data.errors ? data.errors[0].message : 'Invalid credentials.',
    };
  }
}


export async function createApiKey(accessToken) {
  const res = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'API-Key' }),
  });

  const data = await res.json();
  if (res.ok && data.data) {
    return data;
  } else {
    console.error('Failed to create API key:', data);
    throw new Error(
      data.errors ? data.errors[0].message : 'Error creating API key.'
    );
  }
}


export async function register(name, email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, 
      email,
      password
    })
  });
  const data = await res.json();
  const newUser = data.data;
  if (res.ok) {
      localStorage.setItem('accessToken', newUser.accessToken);
      console.log(newUser);
  } else {
      console.log(errors);
  }
  return data;
}
