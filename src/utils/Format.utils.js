const Format = {
    priceFormat(value) {
        const price = value;
        let USDollar = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return USDollar.format(price)
    },
    
}

export default Format;
