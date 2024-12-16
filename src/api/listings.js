import { API_BASE_URL } from './config.js';


export async function fetchAllListings(page = 1, limit = 99) {
  try {
    const queryParams = new URLSearchParams({
      _active: true,
      limit: limit,
      page: page,
    });

    const res = await fetch(`${API_BASE_URL}/auction/listings?${queryParams}`, {
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
export async function fetchListingsWithPagination(page = 1, limit = 99) {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings?_active=true&limit=${limit}&page=${page}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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


export async function updateListing(id, updatedData) {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings/${id}`, {
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
      throw new Error(data.errors?.[0]?.message || 'Failed to update listing.');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating listing:', error.message);
    return { success: false, message: error.message };
  }
}


export async function deleteListing(id) {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve token from storage
  const apiKey = localStorage.getItem('apiKey');

  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
      },
    });

    if (res.status === 204) {
      // 204 No Content indicates a successful delete
      return { success: true };
    } else {
      const data = await res.json();
      throw new Error(data.errors?.[0]?.message || 'Failed to delete listing.');
    }
  } catch (error) {
    console.error(`Error deleting listing with ID ${id}:`, error.message);
    return { success: false, message: error.message };
  }
}


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


export async function searchListings(query) {
  try {
    const res = await fetch(`${API_BASE_URL}/auction/listings/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data: data.data };
    } else {
      console.error('Failed to search listings:', data);
      return { success: false, message: data.errors?.[0]?.message || 'Failed to search listings.' };
    }
  } catch (error) {
    console.error('Error searching listings:', error);
    return { success: false, message: 'Error searching listings.' };
  }
}