import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = props => {

  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`

  const itemAddHandler = item => cartContext.addItem(item);
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

  return (
    <Modal onClose={ props.onClose }>
      { cartItems }
      <div className={ styles.total }>
        <span>Total Amount</span>
        <span>{ totalAmount }</span>
      </div>
      <div className={ styles.actions }>
        <button className={ styles['button--alt'] } onClick={ props.onClose }>Close</button>
        { cartContext.items.length > 0 && <button className={ styles.button } onClick={ props.onClose }>Order</button> }
      </div>
    </Modal>
  )
}

export default Cart;