import { API_BASE_URL } from './config.js';

export async function fetchProfile() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  const name = localStorage.getItem('userName');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}?_listings=true&_wins=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch profile.');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
}

export async function updateProfile() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  const name = localStorage.getItem('userName');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch profile.');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
}

export async function profileListings() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  const name = localStorage.getItem('userName');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}/listings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch profile.');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
}

export async function profileBids() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  const name = localStorage.getItem('userName');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}/bids`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch profile.');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
}

export async function profileWins() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  const name = localStorage.getItem('userName');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}/wins`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch profile.');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
}