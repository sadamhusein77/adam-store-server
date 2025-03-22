// helpers.js
function formatToIDR(amount) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR' 
    }).format(amount);
}

module.exports = { formatToIDR };
