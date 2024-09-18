// JavaScript code to handle mobile navigation toggle

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});



// JavaScript code to handle mobile navigation toggle, filtering, sorting, and pagination

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Product Filtering, Sorting, and Pagination
    const products = Array.from(document.querySelectorAll('.product-item'));
    const productGrid = document.querySelector('.product-grid');
    const viewSelect = document.getElementById('view-select');
    const sortSelect = document.getElementById('sort-select');
    const saleOnlyCheckbox = document.getElementById('sale-only');

    let currentPage = 1;
    let productsPerPage = parseInt(viewSelect.value);
    let filteredProducts = products.slice();

    // Event Listeners
    viewSelect.addEventListener('change', function() {
        productsPerPage = parseInt(this.value);
        currentPage = 1;
        renderProducts();
    });

    sortSelect.addEventListener('change', function() {
        sortProducts();
        renderProducts();
    });

    saleOnlyCheckbox.addEventListener('change', function() {
        filterProducts();
        renderProducts();
    });

    // Functions
    function filterProducts() {
        if (saleOnlyCheckbox.checked) {
            filteredProducts = products.filter(product => product.dataset.sale === 'true');
        } else {
            filteredProducts = products.slice();
        }
        sortProducts();
    }

    function sortProducts() {
        const sortValue = sortSelect.value;
        filteredProducts.sort((a, b) => {
            let aValue, bValue;
            switch (sortValue) {
                case 'price-asc':
                    aValue = parseFloat(a.dataset.price);
                    bValue = parseFloat(b.dataset.price);
                    return aValue - bValue;
                case 'price-desc':
                    aValue = parseFloat(a.dataset.price);
                    bValue = parseFloat(b.dataset.price);
                    return bValue - aValue;
                case 'name-asc':
                    aValue = a.dataset.name.toLowerCase();
                    bValue = b.dataset.name.toLowerCase();
                    if (aValue < bValue) return -1;
                    if (aValue > bValue) return 1;
                    return 0;
                case 'name-desc':
                    aValue = a.dataset.name.toLowerCase();
                    bValue = b.dataset.name.toLowerCase();
                    if (aValue > bValue) return -1;
                    if (aValue < bValue) return 1;
                    return 0;
                default:
                    return 0;
            }
        });
    }

    function renderProducts() {
        // Clear the product grid
        productGrid.innerHTML = '';

        // Calculate total pages
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

        // Ensure current page is within bounds
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }

        // Get products for current page
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToShow = filteredProducts.slice(start, end);

        // Append products to the grid
        productsToShow.forEach(product => {
            productGrid.appendChild(product);
        });

        // Update pagination controls (if implemented)
    }

    // Initial render
    filterProducts();
    renderProducts();

    // Add to Cart Functionality
    const cart = [];

    productGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productItem = e.target.closest('.product-item');
            const productName = productItem.querySelector('h2').textContent;
            const productPrice = parseFloat(productItem.dataset.price);

            addToCart(productName, productPrice);
        }
    });

    function addToCart(name, price) {
        // Simple cart implementation (for demonstration purposes)
        cart.push({ name, price });
        alert(`${name} has been added to your cart.`);
        // In a real application, update cart UI and handle storage
    }
});



// JavaScript code for navigation toggle, gallery lightbox, and contact form validation

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked (optional)
    nav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('active');
        }
    });

    // Gallery Lightbox
    if (document.querySelector('#gallery')) {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        galleryItems.forEach(image => {
            image.addEventListener('click', e => {
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = image.src;
                // Clear previous content
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }
                lightbox.appendChild(img);
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target !== e.currentTarget) return;
            lightbox.classList.remove('active');
        });
    }

    // Contact Form Validation
    if (document.querySelector('.contact-form')) {
        const form = document.querySelector('.contact-form form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.elements['name'].value.trim();
            const email = form.elements['email'].value.trim();
            const message = form.elements['message'].value.trim();
            let valid = true;

            if (name === '') {
                alert('Por favor, ingresa tu nombre.');
                valid = false;
            }

            if (email === '' || !validateEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                valid = false;
            }

            if (message === '') {
                alert('Por favor, ingresa un mensaje.');
                valid = false;
            }

            if (valid) {
                // Submit the form or perform AJAX request
                alert('Gracias por contactarnos. Nos pondremos en contacto contigo pronto.');
                form.reset();
            }
        });

        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
});
