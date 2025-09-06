// Global instances
let cart, searchManager, productRenderer;

// Add logo product to cart function
function addLogoToCart(event) {
    event.preventDefault();
    
    const logoProduct = {
        id: 9,
        name: "Nike LeBron 21 Navy/Gold",
        image: "assets/img/hero-img.png",
        price: 189.99,
        originalPrice: 229.99
    };
    
    if (typeof cart !== 'undefined') {
        cart.addItem(logoProduct);
    } else {
        console.error('Cart is not initialized');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing products...');
    
    // Initialize all components
    cart = new Cart();
    productRenderer = new ProductRenderer();
    productRenderer.init();
    
    // Initialize search after products are loaded
    if (typeof SearchManager !== 'undefined') {
        searchManager = new SearchManager(productRenderer.products);
    }
    
    console.log('All components initialized');
});
