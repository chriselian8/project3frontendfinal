import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  //Making a usestate for the 'page' we're viewing. the return statement will have a bunch of if/else ifs that will determine what page we're on. when a button is clicked, it will set this usestate to something such as 'index', or 'show', for example.
  const [view, setView] = useState('index')
  const [editor, setEditor] = useState('none')

  const [newFoodName, setNewFoodName] = useState('')
  const [newBev, setNewBev] = useState('')
  const [newPersonBringing, setNewPersonBringing] = useState('')

  const [newItemName, setNewItemName] = useState('')
  const [newItemPersonBringing, setNewItemPersonBringing] = useState('')
  const [newItemQuantity, setNewItemQuantity] = useState('')

  const [item, setItem] = useState([])
  const [food, setFood] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
      setFood(response.data)
      console.log(response.data[0].name)
    })
  }, [])

  useEffect(() => {
    axios.get('https://project3backend12.herokuapp.com/item').then((response) => {
      setItem(response.data)
      console.log(response.data[0].name)
    })
  }, [])

  const handleViewHome = () => {
    setView('index')
    setEditor('none')
  }
  const handleViewShowItems = () => {
    setView('show')
    setEditor('none')
  }
  const handleViewAddItems = () => {
    setView('add')
    setEditor('none')
  }
  const handleEditor = () => {
    setEditor('show')
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
    }).then(() => {
      setView('show')
      setEditor('none')
    })
  }
  const handlePotLuckDelete = (potLuckData) => {
    axios.delete(`https://project3backend12.herokuapp.com/food/${potLuckData._id}`).then(() => {
      axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
        setFood(response.data)
      })
    }).then(() => {
      setView('show')
      setEditor('none')
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
      setView('show')
      setEditor('none')
    })
  }

  return (
    <>
      <header>
        <h1> PotLuck </h1>
        <nav>
          <button onClick={handleViewHome}>Home</button>
          <button onClick={handleViewShowItems}>Show Potluck</button>
          <button onClick={handleViewAddItems}>Add Food</button>
        <input placeholder = 'Search by Person Bringing' onChange = {(event) => {setQuery(event.target.value)}}/>
        </nav>
      </header>
      {(() => {
      if (view === 'index') {
        return (
          <>
            <div>
              <h1> welcome to potluck!</h1>
            </div>
          </>
        )
      }
      })()}
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
              <p>{food.name}</p>
              <p>{food.personBringing}</p>
              <div>
                {
                  food.beverage ? <p>Bringing a beverage!</p> : <p>Not bringing a beverage</p>
                }
              </div>
              <button onClick={handleEditor}>Edit Item</button>
            </div>
            </div>
            {(() => {
              if (editor === 'show') {
                return (
            <div>
              <form onSubmit={(event) => {handlePotLuckUpdate(event, food)}}>
                Edit Food: <input type='text' name='name' placeholder={food.name} onChange={handleName}/><br/>
                Edit Person Bringing: <input type='text' name='personBringing' placeholder={food.personBringing} onChange={handlePersonBringing}/><br/>
                Edit Beverage Status: <input type='checkbox' name='beverage' onChange={handleBeverage}/><br/>
                <input type='submit' value='Save Changes'/>
              </form>
              <button onClick={(event) => {
                handlePotLuckDelete(food)
              }}>Delete card</button>
            </div>
          )
        }
            })()}
            </>
        )}
      })}
      {(() => {
      if (view === 'add') {
        return (
          <>
            <div>
              <form onSubmit={handlePotLuckSubmit}>
                Name: <input type='text' onChange={handleName}/><br/>
                Person Bringing: <input type='text' onChange={handlePersonBringing}/><br/>
                Beverage Status: <input type='checkbox' onChange={handleBeverage}/><br/>
                <input type='submit' value='Add Food'/>
              </form>
            </div>
          </>
        )
      }
    })()}
    </>
  )
}

export default App;
