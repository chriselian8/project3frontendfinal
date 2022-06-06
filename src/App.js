import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  //Making a usestate for the 'page' we're viewing. the return statement will have a bunch of if/else ifs that will determine what page we're on. when a button is clicked, it will set this usestate to something such as 'index', or 'show', for example.
  const [view, setView] = useState('index')
  const [editor, setEditor] = useState('none')
  const [itemEditor, setItemEditor] = useState('none')

  const [newFoodName, setNewFoodName] = useState('')
  const [newBev, setNewBev] = useState(false)
  const [newPersonBringing, setNewPersonBringing] = useState('')

  const [newItemName, setNewItemName] = useState('')
  const [newItemPersonBringing, setNewItemPersonBringing] = useState('')
  const [newItemQuantity, setNewItemQuantity] = useState(0)

  const [item, setItem] = useState([])
  const [food, setFood] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('https://project3backend12.herokuapp.com/food').then((response) => {
      setFood(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get('https://project3backend12.herokuapp.com/item').then((response) => {
      setItem(response.data)
    })
  }, [])

  const handleViewHome = () => {
    setView('index')
    setEditor('none')
    setItemEditor('none')
  }
  const handleViewShowItems = () => {
    setView('show')
    setEditor('none')
    setItemEditor('none')
  }
  const handleViewAddItems = () => {
    setView('add')
    setEditor('none')
    setItemEditor('none')
  }
  const handleEditor = () => {
    setEditor('show')
    setItemEditor('none')
  }
  const handleItemEditor = () => {
    setItemEditor('show')
    setEditor('none')
  }
  const handleViewAddItems2 = () => {
    setView('additem')
    setEditor('none')
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
  const handleItemName = () => {
    setNewItemName(window.event.target.value)
  }
  const handleItemPersonBringing = () => {
    setNewItemPersonBringing(window.event.target.value)
  }
  const handleItemQuantity = () => {
    setNewItemQuantity(window.event.target.value)
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
      setItemEditor('none')
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
      setItemEditor('none')
    })
  }
  const handlePotLuckSubmit2 = (event) => {
    event.preventDefault()
    axios.post('https://project3backend12.herokuapp.com/item',
      {
        name: newItemName,
        personBringing: newItemPersonBringing,
        quantity: newItemQuantity
    }).then(() => {
      axios.get('https://project3backend12.herokuapp.com/item').then((response) => {
        setItem(response.data)
      })
    }).then(() => {
      setView('show')
      setEditor('none')
      setItemEditor('none')
    })
  }
  const handlePotLuckDelete2 = (potLuckData) => {
    axios.delete(`https://project3backend12.herokuapp.com/item/${potLuckData._id}`).then(() => {
      axios.get('https://project3backend12.herokuapp.com/item').then((response) => {
        setItem(response.data)
      })
    }).then(() => {
      setView('show')
      setEditor('none')
      setItemEditor('none')
    })
  }
  const handlePotLuckUpdate2 = (event, potLuckData) => {
    event.preventDefault()
    axios.put(`https://project3backend12.herokuapp.com/item/${potLuckData._id}`, {
      name: newItemName,
      personBringing: newItemPersonBringing,
      quantity: newItemQuantity
    }).then(() => {
      axios.get('https://project3backend12.herokuapp.com/item').then((response) => {
        setItem(response.data)
      })
    }).then(() => {
      setView('show')
      setEditor('none')
      setItemEditor('none')
    })
  }

  return (
    <>
      <header>
        <h1> PotLuck </h1>
        <nav>
          <button onClick={handleViewHome}>Home</button>
          <button onClick={handleViewShowItems}>Show Potluck</button>
          <button onClick={handleViewAddItems}>Add Consumable</button>
          <button onClick={handleViewAddItems2}>Add Implement</button>
          {(() => {
            if (view === 'show') {
              return (
                <input placeholder = 'Search by Person Bringing' onChange = {(event) => {setQuery(event.target.value)}}/>
              )
            }
          })()}
        </nav>
      </header>
      {(() => {
      if (view === 'index') {
        return (
          <>
            <div>
              <h1>Welcome to the potluck!</h1>
              <p>This is a page where you can plan out a group potluck and determine who is bringing what.</p>
            </div>
          </>
        )
      }
      })()}
      {view === 'show' ? <h2>Consumables:</h2> : null}
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
              {food.beverage === true ? <p>Drink</p> : null}
              <button onClick={handleEditor}>Edit Consumable</button>
              <button onClick={(event) => {handlePotLuckDelete(food)}}>Delete Consumable</button>
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
        {view === 'show' ? <h2>Implements:</h2> : null}
      {item.filter(item => {
        if (query === ''){
          return item
        } else if (item.personBringing.toLowerCase().includes(query.toLowerCase())){
          return item
        }
      }).map((item) => {
        if (view === 'show'){
        return (
          <>
          <div className = 'container'>
          <div className = 'card'>
            <h3>{item.name}</h3>
            <p>{item.personBringing}</p>
            <p>Bringing: {item.quantity}</p>
            <button onClick={handleItemEditor}>Edit Item</button>
            <button onClick={(event) => {handlePotLuckDelete2(item)}}>Delete Item</button>
          </div>
          </div>
          {(() => {
            if (itemEditor === 'show') {
              return (
                <div>
                  <form onSubmit={(event) => {handlePotLuckUpdate2(event, item)}}>
                    Edit Item: <input type='text' name='name' placeholder={item.name} onChange={handleItemName}/><br/>
                    Edit Person Bringing: <input type='text' name='personBringing' placeholder={item.personBringing} onChange={handleItemPersonBringing}/><br/>
                    Edit Quantity: <input type='text' name='quantity' placeholder={item.quantity} onChange={handleItemQuantity}/><br/>
                    <input type='submit' value='Save Changes'/>
                  </form>
                  <button onClick={(event) => {
                    handlePotLuckDelete2(item)
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
            <h1>Add a consumable!</h1>
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
      {(() => {
      if (view === 'additem') {
        return (
          <>
            <h1>Add an implement!</h1>
            <div>
              <form onSubmit={handlePotLuckSubmit2}>
                Name: <input type='text' onChange={handleItemName}/><br/>
                Person Bringing: <input type='text' onChange={handleItemPersonBringing}/><br/>
                Quantity: <input type='text' onChange={handleItemQuantity}/><br/>
                <input type='submit' value='Add Item'/>
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
