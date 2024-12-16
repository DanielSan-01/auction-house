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

export async function updateProfile(updatedData) {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  const name = localStorage.getItem('userName');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || 'Failed to update profile.');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return { success: false, message: error.message };
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
    const res = await fetch(`${API_BASE_URL}/auction/profiles/${name}/bids?_listings=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch bids.');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching bids:', error.message);
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