import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

import styles from './AvailableMeals.module.css'

import sushi from '../../assets/sushi.jpg';
import schnitzel from '../../assets/schnitzel.jpg';
import burger from '../../assets/burger.jpg'
import salad from '../../assets/salad.jpg'

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 20.99,
    img: sushi
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.49,
    img: schnitzel
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 14.99,
    img: burger
  },
  {
    id: 'm4',
    name: 'Salad Bowl',
    description: 'Healthy and green',
    price: 17.99,
    img: salad
  },
];

const AvailableMeals = () => {
  const availableMealsList = DUMMY_MEALS.map(meal => <MealItem key={ meal.id } meal={ meal } />)

  return (
    <section className={ styles['meals'] }>
      <Card>
        <ul>{ availableMealsList }</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;