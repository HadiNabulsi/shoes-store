// Search functionality  
class SearchManager {
    constructor(products) {
        this.allProducts = [...products.latestProducts, ...products.comingProducts];
        this.setupSearch();
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.clearSearchResults();
            return;
        }

        const results = this.allProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(results, query);
    }

    displaySearchResults(results, query) {
        let searchResults = document.getElementById('searchResults');
        if (!searchResults) {
            searchResults = document.createElement('div');
            searchResults.id = 'searchResults';
            searchResults.className = 'search-results';
            
            // Append to search box container
            const searchBox = document.querySelector('.search-box');
            if (searchBox) {
                searchBox.appendChild(searchResults);
            }
        }

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>No results found for: "${query}"</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = `
                <div class="search-header">
                    <h3>Search results for: "${query}"</h3>
                    <button onclick="searchManager.clearSearchResults()">&times;</button>
                </div>
                <div class="search-items">
                    ${results.map(product => `
                        <div class="search-item" onclick="searchManager.scrollToProduct(${product.id})">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="search-item-info">
                                <h4>${product.name}</h4>
                                <div class="search-item-price">$${product.price.toFixed(2)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        searchResults.style.display = 'block';
    }

    clearSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
    }

    scrollToProduct(productId) {
        // Find and highlight the product
        const productElements = document.querySelectorAll('.product-card');
        productElements.forEach(element => {
            const img = element.querySelector('img');
            if (img && img.src.includes(`p${productId}.jpg`)) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.style.boxShadow = '0 0 20px rgba(255, 186, 0, 0.8)';
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 2000);
            }
        });
        this.clearSearchResults();
    }
}
