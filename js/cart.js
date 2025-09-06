// Cart functionality
class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.updateCartDisplay();
    }

    loadFromStorage() {
        const saved = localStorage.getItem('shoeStoreCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveToStorage() {
        localStorage.setItem('shoeStoreCart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({...product, quantity: 1});
        }
        this.saveToStorage();
        this.updateCartDisplay();
        this.showNotification('Product added to cart!');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveToStorage();
            this.updateCartDisplay();
        }
    }

    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
        this.renderCartSidebar();
    }

    showNotification(message) {
        // Simple notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 9999;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }

    renderCartSidebar() {
        let sidebar = document.getElementById('cartSidebar');
        if (!sidebar) {
            sidebar = document.createElement('div');
            sidebar.id = 'cartSidebar';
            sidebar.className = 'cart-sidebar';
            document.body.appendChild(sidebar);
        }

        const total = this.getTotal();
        sidebar.innerHTML = `
            <div class="cart-header flex-between">
                <h3>Shopping Cart</h3>
                <button onclick="toggleCart()" class="close-cart flex-center">&times;</button>
            </div>
            <div class="cart-items">
                ${this.items.length === 0 ? 
                    '<p class="empty-cart">Cart is empty</p>' :
                    this.items.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <div class="item-price">$${item.price.toFixed(2)}</div>
                                <div class="quantity-controls">
                                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <button onclick="cart.removeItem(${item.id})" class="remove-item">Remove</button>
                        </div>
                    `).join('')
                }
            </div>
            ${this.items.length > 0 ? `
                <div class="cart-footer">
                    <div class="cart-total">
                        <strong>Total: $${total.toFixed(2)}</strong>
                    </div>
                    <button onclick="cart.clearCart()" class="clear-cart">Clear All</button>
                    <button class="checkout-btn">Checkout</button>
                </div>
            ` : ''}
        `;
    }
}

// Toggle cart function
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('cart-open');
    }
}
