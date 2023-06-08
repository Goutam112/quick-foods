import { useEffect, useState } from 'react';

import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

import styles from './AvailableMeals.module.css'

const AvailableMeals = () => {

  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    fetch("https://quick-foods-b7fba-default-rtdb.firebaseio.com/meals.json")
      .then(res => { return res.json() })
      .then(data => {
        const meals = [];
        for (const key in data) {
          meals.push({
            ...data[key],
            id: key
          })
        }
        setAvailableMeals(meals.map(meal => <MealItem key={ meal.id } meal={ meal } />));
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false)
        setHttpError(err.message)
      })
  }, [])

  const content = isLoading ? <p className={ styles.loading }>Loading meals...</p>
    : (httpError ? <p className={ styles.error }>{ `${httpError}` }</p> :
      <ul>{ availableMeals }</ul>)

  return (
    <section className={ styles['meals'] }>
      <Card>
        { content }
      </Card>
    </section>
  )
}

export default AvailableMeals;