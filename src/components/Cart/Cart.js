import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout'
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = props => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`

  const itemAddHandler = item => cartContext.addItem({ ...item, amount: 1 });
  const itemRemoveHandler = id => cartContext.removeItem(id);

  const cartItems = <ul className={ styles['cart-items'] }>
    { cartContext.items.map(item => (
      <CartItem
        key={ item.id }
        item={ item }
        onAdd={ itemAddHandler.bind(null, item) }
        onRemove={ itemRemoveHandler.bind(null, item.id) }
      />)
    ) }
  </ul>

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://quick-foods-b7fba-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items.map(item => { return { id: item.id, item_name: item.name, amount: item.amount } })
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  }

  const modalActions = (<div className={ styles.actions }>
    <button className={ styles['button--alt'] } onClick={ props.onClose }>Close</button>
    { cartContext.items.length > 0 && <button className={ styles.button } onClick={ orderHandler }>Order</button> }
  </div>)

  const cardModalContent = (
    <>
      { cartItems }
      <div className={ styles.total } >
        <span>Total Amount</span>
        <span>{ totalAmount }</span>
      </div>
      { isCheckout && <Checkout onCancel={ props.onClose } onConfirm={ submitOrderHandler } /> }
      { !isCheckout && modalActions }
    </>
  )

  return (
    <Modal onClose={ props.onClose }>
      { isSubmitting && <p className={ styles.status }>Sending order data...</p> }
      { !isSubmitting && !didSubmit && cardModalContent }
      { !isSubmitting && didSubmit && <p className={ styles.status }>Your order has been submitted!</p> }
    </Modal>
  )
}

export default Cart;