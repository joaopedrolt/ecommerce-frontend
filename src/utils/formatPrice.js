export default (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const priceWithComma = formattedPrice.replace('.', ',');
    const formattedString = 'R$' + priceWithComma.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return formattedString;
}