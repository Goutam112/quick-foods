import MealItemForm from './MealItemForm';

import styles from './MealItem.module.css'

const MealItem = props => {
  const price = `$${props.meal.price.toFixed(2)}`

  return (
    <li className={ styles.meal }>
      <div>
        <h3>{ props.meal.name }</h3>
        <div className={ styles.description }>{ props.meal.description }</div>
        <div className={ styles.price }>{ price }</div>
      </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  )
}

export default MealItem;