const API_URL = 'http://localhost:4000/api'; 

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}
