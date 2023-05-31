import { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
  const [btnAnimate, setBtnAnimate] = useState(false)
  const cartContext = useContext(CartContext)
  const numCartItems = cartContext.items.reduce((curr, item) => { return curr + item.amount }, 0);

  const btnClasses = `${styles.button} ${btnAnimate ? styles.bump : ''}`
  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setBtnAnimate(true);
    const timer = setTimeout(() => setBtnAnimate(false), 300)
    return () => clearTimeout(timer);
  }, [cartContext.items])

  return (
    <button className={ btnClasses } onClick={ props.onClick }>
      <span className={ styles.icon }><CartIcon /></span>
      <span>Your Cart</span>
      <span className={ styles.badge }>{ numCartItems }</span>
    </button>
  )
}

export default HeaderCartButton;