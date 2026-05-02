// Fresh Grocers - Complete Application Logic v3.0

const generateId = (prefix = '') => prefix + Math.random().toString(36).substr(2, 6).toUpperCase();

// ===================== INIT DB =====================
function initDB() {
  if (localStorage.getItem('fg_v3')) return;

  const users = [
    { id: 'ADM-001', firstName: 'System', lastName: 'Admin', username: 'admin', password: '123456789', role: 'admin', email: 'admin@freshgrocers.com', phone: '0112345678', registrationDate: '2024-01-01' },
    { id: 'CUST-001', firstName: 'John', lastName: 'Doe', username: 'john', password: '123456789', role: 'customer', email: 'john@example.com', phone: '0712345678', address: '23 Galle Road, Colombo 03', location: 'Colombo 03', registrationDate: '2024-06-15' },
    { id: 'AGT-001', firstName: 'Agent', lastName: 'Smith', username: 'agent1', password: '123', role: 'agent', email: 'smith@freshgrocers.com', phone: '0777777771', location: 'Colombo 03', availability: true, lat: 6.9022, lng: 79.8586, rating: 4.8, totalDeliveries: 120, registrationDate: '2024-02-10' },
    { id: 'AGT-002', firstName: 'Agent', lastName: 'Neo', username: 'agent2', password: '123', role: 'agent', email: 'neo@freshgrocers.com', phone: '0777777772', location: 'Colombo 05', availability: true, lat: 6.8847, lng: 79.8597, rating: 4.9, totalDeliveries: 85, registrationDate: '2024-03-20' },
    { id: 'CSR-001', firstName: 'Sarah', lastName: 'Silva', username: 'csr1', password: '123', role: 'csr', email: 'sarah@freshgrocers.com', phone: '0114567890', registrationDate: '2024-01-20' }
  ];
  saveDB('fg_users', users);

  const categories = [
    { id: 'CAT-001', name: 'Fruits' }, { id: 'CAT-002', name: 'Vegetables' },
    { id: 'CAT-003', name: 'Dairy' }, { id: 'CAT-004', name: 'Bakery' }, { id: 'CAT-005', name: 'Meat' }
  ];
  saveDB('fg_categories', categories);

  const products = [
    { id: 'PRD-001', name: 'Fresh Organic Apples (1kg)', description: 'Hand-picked organic apples from highland farms of Sri Lanka. Rich in fiber and antioxidants. Perfect for a healthy snack or cooking.', price: 850, category: 'Fruits', stock: 50, image: 'https://imgs.search.brave.com/xRelJ4tAlvWU1JWG0lHMN3Ylln96mmD2Otr4jV6GRjg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vcmdh/bmljYW5kcmVhbC5j/b20vY2RuL3Nob3Av/cHJvZHVjdHMvb3Ix/MDAwMDAxMDFfMS5q/cGc_dj0xNjE2Mzc5/OTI1JndpZHRoPTEw/ODA' },
    { id: 'PRD-002', name: 'Farm Fresh Carrots (500g)', description: 'Sun-grown carrots packed with beta-carotene. Sourced daily from local farms. Great for soups, salads, and juicing.', price: 300, category: 'Vegetables', stock: 100, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80' },
    { id: 'PRD-003', name: 'Premium Dairy Milk (1L)', description: 'Fresh full-cream pasteurized milk from certified Sri Lankan dairy farms. Rich, creamy, and full of essential calcium and vitamins.', price: 450, category: 'Dairy', stock: 30, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80' },
    { id: 'PRD-004', name: 'Whole Wheat Artisan Bread', description: 'Freshly baked whole wheat bread made with stone-ground flour. No preservatives, baked fresh every morning by our master bakers.', price: 250, category: 'Bakery', stock: 20, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
    { id: 'PRD-005', name: 'Free Range Eggs (10 pack)', description: 'Farm-fresh eggs from free-range hens raised in open pastures. Superior taste and higher nutritional value compared to caged eggs.', price: 650, category: 'Dairy', stock: 40, image: 'https://cultiveat.co/wp-content/uploads/2021/08/CTV_E5_Kodawari-Eggs_00Cover-1400x1400.jpg' },
    { id: 'PRD-006', name: 'Fresh Chicken Breast (1kg)', description: 'Premium skinless chicken breast, hormone-free and antibiotic-free. Ideal for grilling, baking, or stir-frying for a healthy protein meal.', price: 1500, category: 'Meat', stock: 15, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80' },
    { id: 'PRD-007', name: 'Ripe Bananas (6 pack)', description: 'Naturally ripened Sri Lankan bananas. High in potassium and natural energy. Great for breakfast or a quick snack on the go.', price: 200, category: 'Fruits', stock: 60, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80' },
    { id: 'PRD-008', name: 'Fresh Tomatoes (500g)', description: 'Juicy vine-ripened tomatoes freshly picked from our farm partners. Perfect for salads, curries, and sauces.', price: 350, category: 'Vegetables', stock: 80, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80' },
    { id: 'PRD-009', name: 'Basmati Rice (1kg)', description: 'Premium long-grain basmati rice with a delicate aroma and fluffy texture. Ideal for biryanis, pilafs, and everyday meals.', price: 500, category: 'Bakery', stock: 200, image: 'https://tse3.mm.bing.net/th/id/OIP.Q29wR6x01oWbcqHLRS55BAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'PRD-010', name: 'Greek Yogurt (400g)', description: 'Thick and creamy Greek-style yogurt made from fresh whole milk. High in protein and probiotics. Available in plain variety.', price: 380, category: 'Dairy', stock: 25, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80' },
    {
      id: 'PRD-011',
      name: 'Extra Virgin Olive Oil (500ml)',
      description: 'Cold-pressed extra virgin olive oil. Rich in healthy fats and perfect for dressings, marinades, or light sautéing.',
      price: 1800,
      category: 'Pantry',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-012',
      name: 'Fresh Atlantic Salmon (500g)',
      description: 'Premium cut of fresh Atlantic salmon. Rich in Omega-3 fatty acids and perfect for grilling or baking.',
      price: 2200,
      category: 'Seafood',
      stock: 12,
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-013',
      name: 'Organic Russet Potatoes (1kg)',
      description: 'Versatile and earthy russet potatoes. Ideal for baking, mashing, or making homemade french fries.',
      price: 450,
      category: 'Vegetables',
      stock: 150,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-014',
      name: 'Red Onions (1kg)',
      description: 'Crisp and flavorful red onions. A pantry staple essential for curries, salads, and everyday cooking.',
      price: 380,
      category: 'Vegetables',
      stock: 120,
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-015',
      name: 'Ceylon Green Tea (100g)',
      description: 'Pure Ceylon green tea leaves hand-plucked from high-altitude estates. Refreshing and packed with antioxidants.',
      price: 650,
      category: 'Beverages',
      stock: 75,
      image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-016',
      name: 'Penne Pasta (500g)',
      description: 'Authentic Italian-style penne pasta made from 100% durum wheat semolina. Holds sauces perfectly.',
      price: 400,
      category: 'Pantry',
      stock: 90,
      image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-018',
      name: 'Hass Avocados (2 pieces)',
      description: 'Creamy, ripe Hass avocados. Perfect for spreading on toast, adding to salads, or making fresh guacamole.',
      price: 750,
      category: 'Fruits',
      stock: 35,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-019',
      name: 'Aged Cheddar Cheese (200g)',
      description: 'Sharp and tangy aged cheddar block. Excellent for sandwiches, cheese boards, or grating over warm dishes.',
      price: 950,
      category: 'Dairy',
      stock: 28,
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'PRD-020',
      name: 'Raw Almonds (250g)',
      description: 'Premium quality raw, unsalted almonds. A crunchy, heart-healthy snack packed with vitamin E and protein.',
      price: 1400,
      category: 'Snacks',
      stock: 65,
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80'
    }
  ];
  saveDB('fg_products', products);
  saveDB('fg_orders', []);
  saveDB('fg_ratings', []);
  saveDB('fg_notifications', []);
  saveDB('fg_cart', []);
  localStorage.setItem('fg_v3', 'true');
}

const getDB = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; } };
const saveDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

initDB();

// ===================== NOTIFICATIONS =====================
function addNotification(userId, message, type = 'info') {
  const notifs = getDB('fg_notifications');
  const n = { id: generateId('NTF-'), userId, message, type, read: false, date: new Date().toISOString() };
  notifs.unshift(n);
  saveDB('fg_notifications', notifs);
  updateNotificationBadge();
  return n;
}

function getUnread(userId) { return getDB('fg_notifications').filter(n => n.userId === userId && !n.read); }

function markAllRead(userId) {
  const notifs = getDB('fg_notifications');
  notifs.forEach(n => { if (n.userId === userId) n.read = true; });
  saveDB('fg_notifications', notifs);
  updateNotificationBadge();
}

function updateNotificationBadge() {
  const user = getCurrentUser();
  if (!user) return;
  const count = getUnread(user.id).length;
  const badge = document.getElementById('notif-badge');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
}

function renderNotificationPanel(userId) {
  const list = document.getElementById('notif-list');
  if (!list) return;
  const notifs = getDB('fg_notifications').filter(n => n.userId === userId);
  if (!notifs.length) { list.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--text-muted);">No notifications yet.</div>'; return; }
  list.innerHTML = notifs.slice(0, 25).map(n => `
    <div style="padding:0.75rem 1rem;border-radius:6px;margin-bottom:4px;background:${n.read ? 'transparent' : 'var(--primary-light)'};border-left:3px solid ${n.read ? 'var(--border-light)' : 'var(--primary)'};cursor:default;">
      <div style="font-weight:${n.read ? '400' : '600'};font-size:0.9rem;">${n.message}</div>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:3px;">${new Date(n.date).toLocaleString()}</div>
    </div>`).join('');
}

// ===================== TOAST NOTIFY =====================
function notify(message, type = 'info') {
  let c = document.getElementById('notification-container');
  if (!c) { c = document.createElement('div'); c.id = 'notification-container'; c.className = 'notification-container'; document.body.appendChild(c); }
  const el = document.createElement('div'); el.className = `notification ${type}`;
  const icons = { info: 'ℹ️', success: '✅', error: '🚨', warning: '⚠️' };
  el.innerHTML = `<span style="font-size:1.2rem">${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  c.appendChild(el);
  setTimeout(() => el.classList.add('show'), 10);
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 5000);
}

// ===================== AUTH =====================
function login(username, password) {
  const user = getDB('fg_users').find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('fg_currentUser', JSON.stringify(user));
    notify('Login successful!', 'success');
    setTimeout(() => redirectByRole(user.role), 900);
    return true;
  }
  notify('Invalid username or password', 'error');
  return false;
}

function logout() { localStorage.removeItem('fg_currentUser'); window.location.href = 'index.html'; }
function getCurrentUser() { const u = localStorage.getItem('fg_currentUser'); return u ? JSON.parse(u) : null; }
function getUserFullName(u) { return u ? `${u.firstName || ''} ${u.lastName || u.name || ''}`.trim() : ''; }
function redirectByRole(role) {
  const r = { customer: 'customer-dashboard.html', agent: 'agent-dashboard.html', csr: 'csr-dashboard.html', admin: 'admin-dashboard.html' };
  window.location.href = r[role] || 'index.html';
}

function checkAuth(allowedRoles = []) {
  const user = getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return null; }
  if (allowedRoles.length && !allowedRoles.includes(user.role)) { notify('Unauthorized', 'error'); setTimeout(() => redirectByRole(user.role), 1000); return null; }
  const el = document.getElementById('user-name-display');
  if (el) el.textContent = getUserFullName(user);
  updateNotificationBadge();
  return user;
}

// ===================== CART =====================
function getCart() { return getDB('fg_cart'); }
function getCartTotal() { return getCart().reduce((t, i) => t + i.product.price * i.qty, 0); }
function clearCart() { saveDB('fg_cart', []); updateCartCount(); }

function addToCart(productId, qty = 1) {
  const product = getDB('fg_products').find(p => p.id === productId);
  if (!product) return;
  if (product.stock <= 0) { notify('This product is out of stock', 'error'); return; }
  const cart = getCart(); const ex = cart.find(i => i.product.id === productId);
  if (ex) { ex.qty += qty; } else { cart.push({ product, qty }); }
  saveDB('fg_cart', cart); notify(`${product.name} added!`, 'success'); updateCartCount();
}

function removeFromCart(productId) {
  saveDB('fg_cart', getCart().filter(i => i.product.id !== productId));
  if (typeof renderCart === 'function') renderCart(); updateCartCount();
}

function updateCartItemQty(productId, newQty) {
  if (newQty < 1) { removeFromCart(productId); return; }
  const cart = getCart(); const item = cart.find(i => i.product.id === productId);
  if (item) { item.qty = parseInt(newQty); saveDB('fg_cart', cart); }
  if (typeof renderCart === 'function') renderCart(); updateCartCount();
}

function updateCartCount() { const el = document.getElementById('cart-count'); if (el) el.textContent = getCart().reduce((a, i) => a + i.qty, 0); }

// ===================== ORDERS =====================
function placeOrder(customerDetails, currentUser, isCsrManual = false) {
  const cart = getCart();
  if (!cart.length) { notify('Cart is empty', 'error'); return false; }
  const orderId = generateId('ORD-');
  const order = {
    id: orderId, customerId: currentUser && !isCsrManual ? currentUser.id : 'GUEST',
    customerInfo: customerDetails, items: cart.map(i => ({ ...i })),
    total: getCartTotal(), status: 'Pending', agentId: null,
    date: new Date().toISOString(), ratingId: null, isCsrCreated: isCsrManual,
    csrId: isCsrManual && currentUser ? currentUser.id : null
  };
  const orders = getDB('fg_orders'); orders.push(order); saveDB('fg_orders', orders);

  // Reduce stock
  const products = getDB('fg_products');
  cart.forEach(ci => { const p = products.find(pr => pr.id === ci.product.id); if (p) p.stock = Math.max(0, p.stock - ci.qty); });
  saveDB('fg_products', products);

  clearCart();
  notify(`Order ${order.id} placed!`, 'success');
  setTimeout(() => notify(`[📱 SMS → ${customerDetails.phone}] Order ${order.id} confirmed! Total: Rs.${order.total.toFixed(2)}`, 'success'), 2500);
  if (currentUser && currentUser.role === 'customer') {
    addNotification(currentUser.id, `✅ Order ${order.id} confirmed. Total: Rs.${order.total.toFixed(2)}`, 'success');
  }
  return order.id;
}

function simulateDistance(locA, locB) {
  const diff = Math.abs((locA || '').length - (locB || '').length);
  return (diff * 0.3 + Math.random() * 3 + 1).toFixed(1);
}

// ===================== DOM READY =====================
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  document.getElementById('logout-btn')?.addEventListener('click', e => { e.preventDefault(); logout(); });

  // Notification panel toggle
  const notifBtn = document.getElementById('notif-btn');
  const notifPanel = document.getElementById('notif-panel');
  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = notifPanel.style.display !== 'none';
      notifPanel.style.display = open ? 'none' : 'block';
      if (!open) { const user = getCurrentUser(); if (user) { renderNotificationPanel(user.id); markAllRead(user.id); } }
    });
    document.addEventListener('click', e => { if (!notifBtn.contains(e.target) && !notifPanel.contains(e.target)) notifPanel.style.display = 'none'; });
  }
});
