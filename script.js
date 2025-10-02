document.getElementById('place-order').addEventListener('click', function() {
    // Collect selected items and quantities
    let items = [];
    document.querySelectorAll('.menu-item').forEach(function(itemDiv) {
        let qty = itemDiv.querySelector('.item-qty').value;
        let name = itemDiv.getAttribute('data-name');
        let price = itemDiv.getAttribute('data-price');
        if (qty > 0) {
            items.push(`${name} x${qty} (₹${price})`);
        }
    });

    if (items.length === 0) {
        alert('Please select at least one menu item.');
        return;
    }

    // Get customer details
    let customerName = document.getElementById('customer-name').value.trim();
    let customerAddress = document.getElementById('customer-address').value.trim();

    if (!customerName || !customerAddress) {
        alert('Please fill in your name and delivery address.');
        return;
    }

    // Prepare order message
    let orderText = `Order Details:\n` +
        items.join('\n') + `\n\n` +
        `Name: ${customerName}\n` +
        `Delivery Address: ${customerAddress}`;

    // Encode message for WhatsApp
    let whatsappLink = `https://wa.me/918595545004?text=${encodeURIComponent(orderText)}`;

    // Redirect to WhatsApp
    window.open(whatsappLink, '_blank');
});
