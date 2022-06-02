import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  //Making a usestate for the 'page' we're viewing. the return statement will have a bunch of if/else ifs that will determine what page we're on. when a button is clicked, it will set this usestate to something such as 'index', or 'show', for example.
  const [view, setView] = useState('index')
  const [newFoodName, setNewFoodName] = useState('')
  const [newBev, setNewBev] = useState('')
  const [newPersonBringing, setNewPersonBringing] = useState('')
  const [query, setQuery] = useState('')

  const [food, setFood] = useState([])

  useEffect(() => {
    axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
      setFood(response.data)
      console.log(response.data[0].beverage)
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

  const handleName = () => {
  setNewFoodName(window.event.target.value)
}
const handlePersonBringing = () => {
  setNewPersonBringing(window.event.target.value)
}
const handleBeverage = () => {
  setNewBev(window.event.target.checked)
}
  const handlePotLuckSubmit = (event) => {
    event.preventDefault()
    axios.post('https://project3backend12.herokuapp.com/food',
      {
        name: newFoodName,
        beverage: newBev,
        personBringing: newPersonBringing
    }).then(() => {
      axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
        setFood(response.data)
      })
    })
  }
  const handlePotLuckDelete = (potLuckData) => {
    axios.delete(`https://project3backend12.herokuapp.com/food/${potLuckData._id}`).then(() => {
      axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
        setFood(response.data)
      })
    })
  }
  const handlePotLuckUpdate = (event, potLuckData) => {
    event.preventDefault()
    axios.put(`https://project3backend12.herokuapp.com/food/${potLuckData._id}`, {
      name: newFoodName,
      beverage: newBev,
      personBringing: newPersonBringing
    }).then(() => {
      axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
        setFood(response.data)
      })
    }).then(() => {
      handleViewShowItems()
    })
  }

  return (
    <>
      <header>
        <h1>PotLuck</h1>
        <nav>
          <button onClick={handleViewHome}>Home</button>
          <button onClick={handleViewShowItems}>Show Potluck</button>
        <input placeholder = 'Search by Person Bringing' onChange = {(event) => {setQuery(event.target.value)}}/>
        </nav>
      </header>
      {food.filter(food => {
        if (query === ''){
          return food
        } else if (food.personBringing.toLowerCase().includes(query.toLowerCase())){
          return food
        }
      }).map((food) => {
        if (view === 'show') {
          return (
            <>
            <div className = 'container'>
            <div className = 'card'>
              <h3>{food.name}</h3>
              <p>{food.personBringing}</p>
              {food.beverage ? <p>This is a beverage</p> : <p>This is not a beverage</p>}
              <button onClick={handleViewEditItems}>Edit Potluck</button>
            </div>
            </div>
            </>
        )} else if (view === 'edit') {
          return (
            <>
            <div className = 'container'>
            <div className = 'card'>
              <form onSubmit={(event) => {handlePotLuckUpdate(event, food)}}>
                Edit Food: <input type='text' name='name' placeholder={food.name} onChange={handleName}/><br/>
                Edit Person Bringing: <input type='text' name='personBringing' placeholder={food.personBringing} onChange={handlePersonBringing}/><br/>
                Edit Beverage Status: <input type='checkbox' name='beverage' onChange={handleBeverage}/><br/>
                <input type='submit' value='Save Changes'/>
              </form>
            </div>
            </div>
            </>
        )
        }
      })}
    </>
  )
}

export default App;
