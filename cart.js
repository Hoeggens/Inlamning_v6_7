window.onload = function() {
    displayCart();
};

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.querySelector('.formContainer');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

cart.forEach(item => {
        let cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Article number: ${item.sn}</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${item.price * item.quantity}</p>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const checkoutData = {
        cart: cart
    };

    fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData)
    })
    .then(response => response.json())
    .then( () => {
            localStorage.removeItem('cart');
            alert("Checkout successful!");
            window.location.reload();
    });
}