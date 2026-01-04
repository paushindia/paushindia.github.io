// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.closest('.product');
        const item = {
            id: product.dataset.id,
            name: product.dataset.name,
            price: product.dataset.price,
            qty: 1
        };
        const existing = cart.find(i => i.id == item.id);
        if(existing) existing.qty++;
        else cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Added to Cart!');
    });
});

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

// WhatsApp Push
function whatsappOrder() {
    const msg = `Hi, I want to order from Paush India. Check cart: ${cart.length} items.`;
    window.open(`https://wa.me/9151176462?text=${encodeURIComponent(msg)}`, '_blank');
}

// Razorpay (Your key daalo)
function razorpayCheckout() {
    const options = {
        key: 'rzp_test_YOUR_KEY', // Replace
        amount: cart.reduce((sum, i) => sum + i.price * i.qty * 100, 0),
        currency: 'INR',
        handler: function(response) {
            alert('Payment Success: ' + response.razorpay_payment_id);
            whatsappOrder(); // Confirm on WhatsApp
        }
    };
    razorpay.open(options);
}

// Cart Page pe ye add: Razorpay button onclick="razorpayCheckout()"
