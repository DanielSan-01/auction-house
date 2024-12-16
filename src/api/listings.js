import { API_BASE_URL } from './config.js';

// Fetch all listings
export async function fetchAllListings() {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings?_active=true`, {
      method: 'GET',
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data: data.data };
    } else {
      console.error('Failed to fetch listings:', data);
      return { success: false, message: data.errors?.[0]?.message || 'Failed to fetch listings.' };
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    return { success: false, message: 'Error fetching listings.' };
  }
}

// Fetch single listing
export async function fetchSingleListing(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings/${id}?_bids=true&_seller=true`, {
      method: 'GET',
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data: data.data };
    } else {
      console.error(`Failed to fetch listing with ID ${id}:`, data);
      return { success: false, message: data.errors?.[0]?.message || 'Failed to fetch listing.' };
    }
  } catch (error) {
    console.error(`Error fetching listing with ID ${id}:`, error);
    return { success: false, message: 'Error fetching listing.' };
  }
}


export async function createListing(listing, accessToken, apiKey) {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
      body: JSON.stringify(listing),
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data: data.data };
    } else {
      console.error('Failed to create listing:', data);
      return { success: false, message: data.errors?.[0]?.message || 'Failed to create listing.' };
    }
  } catch (error) {
    console.error('Error creating listing:', error);
    return { success: false, message: 'Error creating listing.' };
  }
}

// Update a listing
export async function updateListing(id, updates, accessToken, apiKey) {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      return { success: true };
    } else {
      const data = await res.json();
      console.error(`Failed to update listing with ID ${id}:`, data);
      return { success: false, message: data.errors?.[0]?.message || 'Failed to update listing.' };
    }
  } catch (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    return { success: false, message: 'Error updating listing.' };
  }
}

// Delete a listing
export async function deleteListing(id, accessToken, apiKey) {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });
    if (res.ok) {
      return { success: true };
    } else {
      const data = await res.json();
      console.error(`Failed to delete listing with ID ${id}:`, data);
      return { success: false, message: data.errors?.[0]?.message || 'Failed to delete listing.' };
    }
  } catch (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    return { success: false, message: 'Error deleting listing.' };
  }
}

// Bid on a listing
export async function createBid(listingId, amount) {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  const response = await fetch(`${API_BASE_URL}/auction/listings/${listingId}/bids`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();
  if (response.ok) {
    return { success: true, data };
  } else {
    return { success: false, message: data.errors?.[0]?.message || 'Failed to place bid.' };
  }
}
