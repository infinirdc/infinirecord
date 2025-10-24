// script.js - Vanilla JS for Infinirecord
// Features: mobile menu, newsletter validation, add-to-cart toast, single audio playback

document.addEventListener('DOMContentLoaded', function(){
  // Gestion du menu mobile
  const burgerButtons = document.querySelectorAll('.burger');
  const mainNav = document.getElementById('main-nav');
  const body = document.body;

  function toggleMenu(isOpen) {
    burgerButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', String(isOpen));
    });
    
    if (mainNav) {
      mainNav.setAttribute('aria-hidden', String(!isOpen));
      body.style.overflow = isOpen ? 'hidden' : '';
    }
  }

  burgerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });
  });

  // Fermer le menu en cliquant sur les liens
  if (mainNav) {
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }

  // Gestion du redimensionnement
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        toggleMenu(false);
        mainNav.style.transition = 'none';
        setTimeout(() => {
          mainNav.style.transition = '';
        }, 100);
      }
    }, 250);
  });

  // Show year in footers
  const yearEls = document.querySelectorAll('[id^="year"]');
  const y = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = y);

  // Newsletter validation
  function validateEmail(email){
    return typeof email === 'string' && email.includes('@') && email.indexOf('@') > 0;
  }

  const newsletterForms = document.querySelectorAll('#newsletter-form, #footer-newsletter');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if(!input) return;
      const val = input.value.trim();
      if(!validateEmail(val)){
        showToast('Veuillez entrer une adresse email valide.');
        input.focus();
        return;
      }
      // Simulate successful subscription
      showToast("Merci ! Vous êtes inscrit(e).");
      input.value = '';
    });
  });

  // Simple toast notification
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(message, duration=3000){
    if(!toastEl) return;
    toastEl.textContent = message;
    toastEl.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.style.display = 'none'; }, duration);
  }

  // Add to cart buttons
  const cartCountEl = document.querySelector('.cart-count');
  let cartCount = 0;
  document.addEventListener('click', (e) => {
    const add = e.target.closest('.add-to-cart');
    if(add){
      cartCount += 1;
      if(cartCountEl) cartCountEl.textContent = cartCount;
      showToast('Produit ajouté au panier');
    }
  });

  // Single audio playback control: only one audio plays at a time
  const audios = Array.from(document.querySelectorAll('audio'));
  audios.forEach(a => {
    a.addEventListener('play', () => {
      audios.forEach(other => { if(other !== a) other.pause(); });
    });
  });

  // Play sample buttons (services page) — they use data-src attribute
  const sampleButtons = Array.from(document.querySelectorAll('.play-sample'));
  sampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      if(!src) return;
      // Create a temporary audio to play the preview
      const tmp = new Audio(src);
      // Pause other audios
      audios.forEach(a => a.pause());
      tmp.play();
      showToast('Lecture du sample');
      setTimeout(() => tmp.pause(), 15000); // auto-stop after 15s
    });
  });

  // Gestion du panier
  class Cart {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('cart')) || [];
      this.updateCartCount();
    }

    add(productId, productName) {
      this.items.push({ id: productId, name: productName });
      this.save();
      this.updateCartCount();
      showToast(`${productName} ajouté au panier`);
    }

    remove(productId) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index > -1) {
        const item = this.items[index];
        this.items.splice(index, 1);
        this.save();
        this.updateCartCount();
        showToast(`${item.name} retiré du panier`);
      }
    }

    save() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        cartCount.textContent = this.items.length;
      }
    }
  }

  // Initialisation du panier
  const cart = new Cart();

  // Si on est sur la page cart.html, afficher le contenu
  function renderCartPage() {
    const cartSection = document.getElementById('cart-contents');
    const cartActions = document.getElementById('cart-actions');
    if (!cartSection) return;

    if (cart.items.length === 0) {
      cartSection.innerHTML = '<p>Votre panier est vide.</p>';
      if (cartActions) cartActions.style.display = 'none';
      return;
    }

    // Construire la table du panier
    let html = '<table class="cart-table"><thead><tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Total</th><th></th></tr></thead><tbody>';
    // On va simuler des prix par id si pas fournis
    let grandTotal = 0;
    cart.items.forEach((it, idx) => {
      const price = it.price || (it.id === 'midnight-dreams' ? 49.99 : 29.99);
      const qty = it.qty || 1;
      const lineTotal = price * qty;
      grandTotal += lineTotal;
      html += `<tr data-idx="${idx}"><td>${it.name}</td><td>${price.toFixed(2)} €</td><td><input class="cart-qty" type="number" min="1" value="${qty}" data-idx="${idx}"></td><td class="line-total">${lineTotal.toFixed(2)} €</td><td><button class="remove-item" data-idx="${idx}">Supprimer</button></td></tr>`;
    });
    html += `</tbody></table><div class="cart-summary"><strong>Total: <span id="cart-grand-total">${grandTotal.toFixed(2)} €</span></strong></div>`;

    cartSection.innerHTML = html;
    if (cartActions) cartActions.style.display = '';

    // Wire up quantity changes
    cartSection.querySelectorAll('.cart-qty').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        let val = parseInt(e.target.value, 10) || 1;
        if (val < 1) val = 1;
        cart.items[idx].qty = val;
        cart.save();
        renderCartPage();
        cart.updateCartCount();
      });
    });

    // Remove handlers
    cartSection.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const item = cart.items[idx];
        if (!item) return;
        cart.items.splice(idx, 1);
        cart.save();
        renderCartPage();
        cart.updateCartCount();
      });
    });
  }

  // Clear cart button on cart.html
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      cart.items = [];
      cart.save();
      renderCartPage();
      cart.updateCartCount();
    });
  }

  // Checkout (demo)
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.items.length === 0) { showToast('Votre panier est vide'); return; }
      // Demo: clear cart and show message
      cart.items = [];
      cart.save();
      renderCartPage();
      cart.updateCartCount();
      showToast('Paiement simulé — merci pour votre achat !');
    });
  }

  // If on cart page, render
  renderCartPage();

  // Gestion des filtres de la boutique
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const productsGrid = document.querySelector('.products-grid');

  if (categoryFilter && productsGrid) {
    // Filtrage par catégorie
    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      const products = document.querySelectorAll('.product-card');

      products.forEach(product => {
        if (selectedCategory === 'all' || product.dataset.category === selectedCategory) {
          product.style.display = '';
        } else {
          product.style.display = 'none';
        }
      });
    });

    // Tri des produits
    sortFilter.addEventListener('change', () => {
      const products = Array.from(document.querySelectorAll('.product-card'));
      const sortValue = sortFilter.value;

      products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent);
        const priceB = parseFloat(b.querySelector('.price').textContent);

        if (sortValue === 'price-low') {
          return priceA - priceB;
        } else if (sortValue === 'price-high') {
          return priceB - priceA;
        }
        // Par défaut, tri par plus récent (ordre original)
        return 0;
      });

      // Réinsertion des produits dans l'ordre trié
      products.forEach(product => productsGrid.appendChild(product));
    });
  }

  // Gestion des boutons d'ajout au panier
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      const card = e.target.closest('.product-card');
      const productName = card.querySelector('h3').textContent;
      // parse price number from text like '29.99 €'
      const priceText = card.querySelector('.price').textContent || '0';
      const price = parseFloat(priceText.replace(/[€\s]/g, '')) || 0;
      // Default qty = 1
      const item = { id: productId, name: productName, price: price, qty: 1 };
      cart.items.push(item);
      cart.save();
      cart.updateCartCount();
      showToast(`${productName} ajouté au panier`);
      
      // Animation de confirmation
  const originalText = button.textContent;
  button.textContent = 'Ajouté !';
  button.style.background = 'var(--accent-2)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    });
  });

});
