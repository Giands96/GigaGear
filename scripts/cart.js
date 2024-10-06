// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Funciones globales
window.displayCart = function() {
    window.location.href = 'confirmar-pago.html';
};

window.displayCartSummary = function() {
    const cartSummary = document.getElementById('cart-summary');
    const orderTotal = document.getElementById('order-total');
    if (!cartSummary || !orderTotal) return;

    let subtotal = 0;
    let cartContent = '';

    for (const [id, item] of Object.entries(cart)) {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartContent += `
            <div class="flex items-center justify-between border-b py-4">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mr-4">
                    <div>
                        <h3 class="font-semibold">${item.name}</h3>
                        <p>Cantidad: ${item.quantity}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p>Precio: S/ ${item.price.toFixed(2)}</p>
                    <p class="font-semibold">Subtotal: S/ ${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }

    cartSummary.innerHTML = cartContent;

    const igv = subtotal * 0.18;
    const total = subtotal + igv + shippingCost;

    orderTotal.innerHTML = `
        <p>Subtotal: S/ ${subtotal.toFixed(2)}</p>
        <p>IGV (18%): S/ ${igv.toFixed(2)}</p>
        <p>Costo de envío: S/ ${shippingCost.toFixed(2)}</p>
        <h3 class="text-xl font-bold mt-2">Total: S/ ${total.toFixed(2)}</h3>
    `;
};

window.removeFromCart = function(productId) {
    delete cart[productId];
    updateCartUI();
    saveCart();
    displayCartSummary();
};

window.clearCart = function() {
    cart = {};
    saveCart();
    updateCartUI();
};

function updateCart(increment = true) {
    const itemCount = document.getElementById('itemCount');
    if (itemCount) {
        const count = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
        itemCount.textContent = count;
        itemCount.classList.add('scale-110', 'transition-all');
        setTimeout(() => itemCount.classList.remove('scale-110'), 200);
    }
}

function showModal(image, name, description) {
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const productModal = document.getElementById('productModal');

    if (modalProductImage) modalProductImage.src = image;
    if (modalProductName) modalProductName.textContent = name;
    if (modalProductDescription) modalProductDescription.textContent = description;
    if (productModal) productModal.classList.remove('hidden');
}

function closeModal() {
    const productModal = document.getElementById('productModal');
    if (productModal) productModal.classList.add('hidden');
}

function addToCart(productId, name, price, image) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = { name, price, image, quantity: 1 };
    }
    updateCartUI();
    saveCart();
}

function updateCartUI() {
    updateCart(false);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const confirmAdd = document.getElementById('confirmAdd');
    const cancelAdd = document.getElementById('cancelAdd');
    const cartButton = document.getElementById('cart');

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;
            showModal(image, name, "¿Deseas agregar este producto al carrito?");
            
            localStorage.setItem('tempProduct', JSON.stringify({id: productId, name, price, image}));
        });
    });

    if (confirmAdd) {
        confirmAdd.addEventListener('click', () => {
            closeModal();
            const tempProduct = JSON.parse(localStorage.getItem('tempProduct'));
            if (tempProduct) {
                addToCart(tempProduct.id, tempProduct.name, tempProduct.price, tempProduct.image);
                localStorage.removeItem('tempProduct');
            }
        });
    }

    if (cancelAdd) cancelAdd.addEventListener('click', closeModal);

    if (cartButton) cartButton.addEventListener('click', displayCart);

    updateCartUI();

    // Si estamos en la página de confirmación de pago, mostramos el resumen del carrito
    if (window.location.pathname.includes('confirmar-pago.html')) {
        displayCartSummary();
    }
});