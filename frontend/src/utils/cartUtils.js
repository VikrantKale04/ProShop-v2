export const addToDecimal= (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
};

export const updateCart = (state) => {
     // calculate price for item
     state.itemsPrice  = addToDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) )

     // calculate shipping price (if item price > 100 then free)
     state.shippingPrice = addToDecimal(state.itemsPrice > 100 ? 0 :10);

     // calculate tac 15%
     state.taxPrice = addToDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

     // calculate total price
     state.totalPrice = (
         Number(state.itemsPrice) +
         Number(state.shippingPrice) +
         Number(state.taxPrice)
       ).toFixed(2);
 
       // Save the cart to localStorage
       localStorage.setItem('cart', JSON.stringify(state));
       
       return state; 
}