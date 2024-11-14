window.onload = function() {
    checkCart();
};

const url = 'http://localhost:3000/products';  
let span = document.getElementById('iconSpan');
let cart = {};

fetch(url)
.then(response => {
    if (!response.ok)
        console.log("Error fetching data");
    return response.json();
})
.then(data => {
    viewProducts(data);
});

function viewProducts(data) {
    const cardContainer = document.getElementById('cardForm');

    data.forEach(item => {
        let productCard = document.createElement('div');
        productCard.classList.add('card');
        
        let h3 = document.createElement('h3');
        h3.textContent = item.name;
        
        let p = document.createElement('p');
        p.textContent = item.description;
        
        let artNr = document.createElement('p');
        artNr.textContent = item.articleNumber;
        
        let price = document.createElement('p');
        price.textContent = item.price + ' $';
        
        let amount = document.createElement('input');
        amount.className = 'inputAmount';
        amount.type = 'number';
        amount.value = 0;
        amount.max = 9;
        
        let btn = document.createElement('button');
        btn.className = 'submitButton';
        btn.type = 'button';
        btn.textContent = 'Add to cart';
        btn.onclick = () => {
            let quantity = parseInt(amount.value);
            if (quantity <= 0 || quantity >= 10) {
                alert("Please select a valid quantity (greater than 0, lower than 10).");
                amount.value = 0;
            } else if (quantity >= 1 && quantity <= 9) {
                addToCart(item, quantity);
            }
        };
        
        productCard.appendChild(h3);
        productCard.appendChild(artNr);
        productCard.appendChild(p);
        productCard.appendChild(price);
        productCard.appendChild(amount);
        productCard.appendChild(btn);
        
        cardContainer.appendChild(productCard);
    });
}

function addToCart(product, quantity) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItem = {
        id: product.id,
        name: product.name,
        sn: product.articleNumber,
        quantity: quantity,
        price: product.price
    };
    
    let existingItem = cart.find(item => item.sn === cartItem.sn);

    if (existingItem) 
        existingItem.quantity += cartItem.quantity;
    else 
        cart.push(cartItem);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    span.style.visibility = 'visible';
    console.log("Added to cart:", cartItem);
}

function checkCart() {
    let isEmpty = JSON.parse(localStorage.getItem('cart'));
    if (!isEmpty) {
        span.style.visibility = 'hidden';
    } else {
        span.style.visibility = 'visible';
    }
}