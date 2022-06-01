import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  //Making a usestate for the 'page' we're viewing. the return statement will have a bunch of if/else ifs that will determine what page we're on. when a button is clicked, it will set this usestate to something such as 'index', or 'show', for example.
  const [view, setView] = useState('index')
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

  const handleViewHome = () => {
    setView('index')
  }
  const handleViewShowItems = () => {
    setView('show')
  }
  const handleViewEditItems = () => {
    setView('edit')
  }
  const handlePotLuckSubmit = (event) => {
    event.preventDefault()
    axios.post('https://project3backend12.herokuapp.com/',
      {
        itemName: newItemName,
        type: newType,
        personBringing: newPersonBringing
    }).then(() => {
      axios.get('https://project3backend12.herokuapp.com').then((response) => {
        setFood(response.data)
      })
    })
  }
  const handlePotLuckDelete = (potLuckData) => {
    axios.delete(`https://project3backend12.herokuapp.com/${potLuckData._id}`).then(() => {
      axios.get('https://project3backend12.herokuapp.com').then((response) => {
        setFood(response.data)
      })
    })
  }
  const handlePotLuckUpdate = (event, potLuckData) => {
    event.preventDefault()
    axios.put(`https://project3backend12.herokuapp.com/${potLuckData._id}`, {
      itemName: newItemName,
      type: newType,
      personBringing: newPersonBringing
    }).then(() => {
      axios.get('https://project3backend12.herokuapp.com').then((response) => {
        setFood(response.data)
      })
    })
  }

  return (
    <>
      <header>
        <h1> PotLuck </h1>
        <nav>
          <button onClick={handleViewHome}>Home</button>
          <button onClick={handleViewShowItems}>Show Potluck</button>
          <button onClick={handleViewEditItems}>Edit Potluck</button>
        </nav>
      </header>
      {food.map((food) => {
        if (view === 'index') {
          return (
            <div>
              <p>Welcome to the Potluck!</p>
            </div>
        )} else if (view === 'show') {
          return (
            <div>
              <p>{food.name}</p>
              <p>{food.beverage}</p>
              <p>{food.personBringing}</p>
            </div>
        )} else if (view === 'edit') {
          return (
            <div>
              <h1> edit </h1>
            </div>
          )
        }
      })}
    </>
  )
}

export default App;
