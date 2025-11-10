// Auth functionality
(function() {
    const USERS_KEY = 'shop_users';
    const CURRENT_USER_KEY = 'shop_current_user';
    
    // Get users from localStorage
    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    // Save users to localStorage
    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    // Set current user
    function setCurrentUser(user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        updateAuthUI();
    }

    // Get current user
    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
        } catch (e) {
            return null;
        }
    }

    // Update UI based on auth state
    function updateAuthUI() {
        const user = getCurrentUser();
        const signInBtn = document.getElementById('sign-in-btn');
        const signUpBtn = document.getElementById('sign-up-btn');
        
        if (user) {
            signInBtn.textContent = user.name;
            signUpBtn.textContent = 'SIGN OUT';
        } else {
            signInBtn.textContent = 'SIGN IN';
            signUpBtn.textContent = 'SIGN UP';
        }
    }

    // Show error in form
    function showError(formId, message) {
        const errorDiv = document.querySelector(`#${formId} .form-error`);
        if (errorDiv) {
            errorDiv.textContent = message;
            setTimeout(() => {
                errorDiv.textContent = '';
            }, 3000);
        }
    }

    // Handle login form submit
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            setCurrentUser(user);
            document.getElementById('login-modal').style.display = 'none';
            this.reset();
        } else {
            showError('login-form', 'Invalid email or password');
        }
    });

    // Handle signup form submit
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        
        if (password !== confirm) {
            showError('signup-form', 'Passwords do not match');
            return;
        }
        
        const users = getUsers();
        if (users.some(u => u.email === email)) {
            showError('signup-form', 'Email already registered');
            return;
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        saveUsers(users);
        setCurrentUser(newUser);
        
        document.getElementById('signup-modal').style.display = 'none';
        this.reset();
    });

    // Modal controls
    document.getElementById('sign-in-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const user = getCurrentUser();
        if (user) {
            // If signed in, show user menu or handle click differently
            return;
        }
        document.getElementById('login-modal').style.display = 'flex';
    });

    document.getElementById('sign-up-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const user = getCurrentUser();
        if (user) {
            // Handle sign out
            localStorage.removeItem(CURRENT_USER_KEY);
            updateAuthUI();
            return;
        }
        document.getElementById('signup-modal').style.display = 'flex';
    });

    // Close buttons
    document.querySelectorAll('.close-auth').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.auth-modal').style.display = 'none';
        });
    });

    // Switch between modals
    document.getElementById('switch-to-signup').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('signup-modal').style.display = 'flex';
    });

    document.getElementById('switch-to-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signup-modal').style.display = 'none';
        document.getElementById('login-modal').style.display = 'flex';
    });

    // Close modal if clicking outside
    document.querySelectorAll('.auth-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Initialize auth UI
    updateAuthUI();
})();

$(document).ready(function () {
    $("a").on("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            window.location.hash = hash;
          }
        );
      }
    });
  });
  
  $(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
  });
  
  // --- Cart (localStorage-backed) ---
  (function () {
    function getCart() {
      try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
      } catch (e) {
        return [];
      }
    }

    function saveCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    }

    function updateCartCount() {
      const cart = getCart();
      const count = cart.reduce((s, it) => s + (it.qty || 1), 0);
      const el = document.getElementById('cart-count');
      if (el) el.textContent = count;
    }

    function formatPrice(n) {
      return '$' + Number(n).toFixed(2);
    }

    function renderCart() {
      const cart = getCart();
      const container = document.getElementById('cart-contents');
      const totalEl = document.getElementById('cart-total');
      container.innerHTML = '';
      let total = 0;
      if (!cart.length) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      }
      cart.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.dataset.idx = idx;
        row.innerHTML = `
          <div class="cart-item-left">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)} each</div>
          </div>
          <div class="cart-item-right">
            <div class="qty-controls">
              <button class="dec-qty" data-idx="${idx}">-</button>
              <span class="qty" data-idx="${idx}">${item.qty}</span>
              <button class="inc-qty" data-idx="${idx}">+</button>
            </div>
            <div class="line-total">${formatPrice(item.price * item.qty)}</div>
            <button class="remove-item" data-idx="${idx}">Remove</button>
          </div>
        `;
        container.appendChild(row);
        total += item.price * item.qty;
      });
      totalEl.textContent = formatPrice(total);

      // attach handlers via delegation handled below
    }

    function addToCart(name, price) {
      const cart = getCart();
      const idx = cart.findIndex(i => i.name === name && i.price === price);
      if (idx > -1) {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart.push({ name: name, price: Number(price), qty: 1 });
      }
      saveCart(cart);
      renderCart();
    }

    function attachAddButtons() {
      const cards = document.querySelectorAll('.best-p1');
      cards.forEach(card => {
        const buyNow = card.querySelector('.buy-now');
        if (!buyNow) return;
        if (card.querySelector('.add-cart')) return;
        const priceText = (card.querySelector('.price') || {}).innerText || '';
        const priceMatch = priceText.replace(/\s+/g,' ').match(/\$?([0-9]+\.?[0-9]*)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        const name = (card.querySelector('.name-of-p p') || {}).innerText || 'Item';
        const addDiv = document.createElement('div');
        addDiv.className = 'add-cart';
        addDiv.innerHTML = `<button class="add-to-cart-btn" data-name="${name.replace(/"/g,'') }" data-price="${price}">Add To Cart</button>`;
        buyNow.parentNode.insertBefore(addDiv, buyNow.nextSibling);
      });
    }

    // modal open/close
    function openCartModal() {
      const modal = document.getElementById('cart-modal');
      if (modal) modal.style.display = 'flex';
      renderCart();
    }
    function closeCartModal() {
      const modal = document.getElementById('cart-modal');
      if (modal) modal.style.display = 'none';
    }

    function clearCart() {
      localStorage.removeItem('cart');
      updateCartCount();
      renderCart();
    }

    // delegation for cart interactions
    document.addEventListener('click', function (e) {
      const t = e.target;
      if (!t) return;

      if (t.classList && t.classList.contains('add-to-cart-btn')) {
        const name = t.dataset.name;
        const price = Number(t.dataset.price || 0);
        addToCart(name, price);
        openCartModal();
      }

      if (t.id === 'cart-btn') {
        openCartModal();
      }

      if (t.id === 'close-cart') {
        closeCartModal();
      }

      if (t.id === 'clear-cart') {
        if (confirm('Clear the cart?')) clearCart();
      }

      if (t.classList && t.classList.contains('inc-qty')) {
        const idx = Number(t.dataset.idx);
        const cart = getCart();
        if (cart[idx]) {
          cart[idx].qty = (cart[idx].qty || 1) + 1;
          saveCart(cart);
          renderCart();
        }
      }

      if (t.classList && t.classList.contains('dec-qty')) {
        const idx = Number(t.dataset.idx);
        const cart = getCart();
        if (cart[idx]) {
          cart[idx].qty = (cart[idx].qty || 1) - 1;
          if (cart[idx].qty <= 0) {
            cart.splice(idx, 1);
          }
          saveCart(cart);
          renderCart();
        }
      }

      if (t.classList && t.classList.contains('remove-item')) {
        const idx = Number(t.dataset.idx);
        const cart = getCart();
        if (cart[idx]) {
          cart.splice(idx, 1);
          saveCart(cart);
          renderCart();
        }
      }
    });

    // initialize
    updateCartCount();
    attachAddButtons();
    renderCart();

    // expose small API
    window._cart = { getCart, saveCart, addToCart, renderCart, clearCart };
  })();
  