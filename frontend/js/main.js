const API_URL = 'https://romavision.onrender.com/api';

// Get Token from localStorage
const getToken = () => localStorage.getItem('token');

// Get User from localStorage
const getUser = () => JSON.parse(localStorage.getItem('user'));

// Save Token and User to localStorage
const saveAuth = (user, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove Token and User from localStorage
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login.html';
};

// Check if user is logged in
const isLoggedIn = () => {
  return getToken() !== null;
};

// Check if user is admin
const isAdmin = () => {
  const user = getUser();
  return user && user.role === 'admin';
};

// Fetch with Auth Token
const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  return response;
};

// Format Price in Indian Rupees
const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Show Alert Message
const showAlert = (message, type = 'success') => {
  const alert = document.getElementById('alert');
  if (alert) {
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  }
};

// Get Cart from localStorage
const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Save Cart to localStorage
const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Add to Cart
const addToCart = (product) => {
  let cart = getCart();
  const existingItem = cart.find(item => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  showAlert('Product added to cart!');
};

// Get Cart Count
const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Update Cart Count in Navbar
const updateCartCount = () => {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
};

// Run on every page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});