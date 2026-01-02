// Store functionality
// This file handles loading products and redirecting to Stripe Payment Links

// Load products from config and display them
function loadProducts() {
    const container = document.getElementById('productsContainer');
    
    if (!container) {
        console.error('Products container not found');
        return;
    }

    // Update store name if configured
    if (STORE_CONFIG.storeName) {
        const storeNameEl = document.getElementById('storeName');
        if (storeNameEl) storeNameEl.textContent = STORE_CONFIG.storeName;
        document.title = STORE_CONFIG.storeName + ' - Professional Laboratory Equipment';
    }

    if (STORE_CONFIG.storeTagline) {
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) heroTitle.textContent = STORE_CONFIG.storeTagline;
    }

    if (!STORE_CONFIG.products || STORE_CONFIG.products.length === 0) {
        container.innerHTML = '<p class="no-products">No products available. Please configure products in config.js</p>';
        return;
    }

    container.innerHTML = STORE_CONFIG.products.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">` : '<div class="product-image-placeholder">No Image</div>'}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-footer">
                    ${product.price ? `<span class="product-price">${product.price}</span>` : ''}
                    <button 
                        class="buy-button" 
                        data-payment-link="${product.paymentLink}"
                        data-product-name="${product.name}"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to all buy buttons
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });
}

// Handle buy button click - redirect to Stripe Payment Link
function handleBuyClick(event) {
    const button = event.target;
    const paymentLink = button.getAttribute('data-payment-link');

    if (!paymentLink || paymentLink.includes('YOUR_PAYMENT_LINK_HERE')) {
        alert('Please configure your Stripe Payment Link in config.js\n\nCreate one at: https://dashboard.stripe.com/payment-links');
        return;
    }

    // Redirect to Stripe Payment Link
    window.location.href = paymentLink;
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
