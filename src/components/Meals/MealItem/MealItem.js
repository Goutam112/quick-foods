import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css'
import CartContext from '../../../store/cart-context'

const MealItem = props => {
  const cartContext = useContext(CartContext)

  const price = `$${props.meal.price.toFixed(2)}`

  const addToCartHandler = amount => cartContext.addItem({ ...props.meal, amount: amount });

  return (
    <li className={ styles.meal }>
      <div className={ styles['meal-info'] }>
        <img className={ styles['meal-img'] } src={ props.meal.img } alt='' />
        <div>
          <h3>{ props.meal.name }</h3>
          <div className={ styles.description }>{ props.meal.description }</div>
          <div className={ styles.price }>{ price }</div>
        </div>
      </div>
      <div>
        <MealItemForm id={ props.meal.id } onAddToCart={ addToCartHandler } />
      </div>
    </li>
  )
}

export default MealItem;