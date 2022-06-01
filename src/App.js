import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [newItemName, setNewItemName] = useState('')
  const [newType, setNewType] = useState('')
  const [newPersonBringing, setNewPersonBringing] = useState('')

  const [food, setFood] = useState([])

  useEffect(() => {
    axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
      setFood(response.data)
      console.log(response.data[0].type)
    })
  }, [])

  return (
    <>
      {food.map((food) => {
        return (
          <>
          <p>{food.name}</p>
          <p>{food.beverage}</p>
          <p>{food.personBringing}</p>
          </>
        )
      })}
    </>
  )
}

export default App;
