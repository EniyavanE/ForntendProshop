export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => { //calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    // calculate shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    //  calculate tax amount
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
    // calculate total price
    state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice))
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}