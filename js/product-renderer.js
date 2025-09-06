// Products rendering functionality
class ProductRenderer {
    constructor() {
        this.products = PRODUCTS_DATA;
    }

    loadProducts() {
        // Data is already available, no need to fetch
        console.log('Products loaded:', this.products);
        return this.products;
    }

    renderProduct(product) {
        return `
            <div class="product-item">
                <div class="product-card">
                    <img class="img-fluid" src="${product.image}" alt="${product.name}">
                    <div class="product-details">
                        <h6>${product.name}</h6>
                        <div class="price">
                            <h6>$${product.price.toFixed(2)}</h6>
                            <h6 class="l-through">$${product.originalPrice.toFixed(2)}</h6>
                        </div>
                        <div class="prd-bottom">
                            <a href="#" onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')}); return false;" class="social-info">
                                <i class="fas fa-shopping-bag"></i>
                                <p class="hover-text">add to bag</p>
                            </a>
                            <a href="#" class="social-info">
                                <i class="fas fa-heart"></i>
                                <p class="hover-text">Wishlist</p>
                            </a>
                            <a href="#latest-products" class="social-info">
                                <i class="fas fa-eye"></i>
                                <p class="hover-text">view more</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderProductGrid(products) {
        return products.map(product => this.renderProduct(product)).join('');
    }

    renderLatestProducts() {
        const container = document.querySelector('#latest-products .products-grid');
        console.log('Latest products container:', container);
        if (container && this.products) {
            const html = this.renderProductGrid(this.products.latestProducts);
            console.log('Generated HTML for latest products:', html);
            container.innerHTML = html;
        }
    }

    renderComingProducts() {
        const container = document.querySelector('#coming-products .products-grid');
        console.log('Coming products container:', container);
        if (container && this.products) {
            const html = this.renderProductGrid(this.products.comingProducts);
            console.log('Generated HTML for coming products:', html);
            container.innerHTML = html;
        }
    }

    init() {
        this.loadProducts();
        this.renderLatestProducts();
        this.renderComingProducts();
    }
}
