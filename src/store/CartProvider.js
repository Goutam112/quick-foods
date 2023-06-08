import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 }

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = Math.round(100 * (state.totalAmount + (action.item.price * action.item.amount))) / 100;
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      updatedItems = [...state.items];
      if (existingCartItem.amount < 99) {
        const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount }
        updatedItems[existingCartItemIndex] = updatedItem;
      }
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = Math.round(100 * (state.totalAmount - existingCartItem.price)) / 100

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = { ...existingCartItem, amount: existingCartItem.amount - 1 }
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount }
  }

  if (action.type === 'CLEAR_CART') {
    return defaultCartState
  }

  return defaultCartState;
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addToCartHandler = item => dispatchCartAction({ type: 'ADD_ITEM', item: item });
  const removeFromCartHandler = id => dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  const clearCartHandler = () => dispatchCartAction({ type: 'CLEAR_CART' })

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={ cartContext }>
      { props.children }
    </ CartContext.Provider>
  )
};

export default CartProvider;