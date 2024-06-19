import {React, useState} from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import * as methods from '../methods/method'

function Edit() {
    const navigate = useNavigate()
    const {state} = useLocation()  
    
    const[todo,setTodo]=useState({ 
        Title:state.attributes.Title,
      Details:state.attributes.Details,
    Date:state.attributes.Date})

    const [error,setError]=useState(false)

    const updateTodo = async(e) => { //Update Todo
        e.preventDefault()

        if(todo.Title.length < 4 || todo.Details.length < 4 || todo.Date.length < 4){ //Check min length and Date
            setError(true)
            setTimeout(() => setError(false), 3000)
            return
          }  

        try{
            await methods.updateTodo(state.id,todo)
            navigate('/')
        }
        catch(error){
            alert('Unable to connect to the server to update TODO, please check your connection or try later')
        }
    }

  return (
    <>
    <header className='header'>
      Lianeli TODO App
    </header>
    <div className='input-todo' id='edit-todo'>
      <h3>
        Edit your TODO right here :
      </h3>
      <form>
        <label htmlFor='title'>
          Title :
        </label>
        <input type='text' id='title' onChange={(e) => setTodo({...todo,  Title:e.target.value})} value={todo.Title}  placeholder='Write the title of your todo here'/>
        <label htmlFor='details'>
          Details :
        </label>
        <textarea id='details' placeholder='Do not forget to add some details !' onChange={(e) => setTodo({...todo,  Details:e.target.value})} value={todo.Details} rows='5' cols='50' ></textarea>
        <label htmlFor='date'>
          Set the Date for your todo :
        </label>
        <input type='date' id='date' onChange={(e) => setTodo({...todo,  Date:e.target.value})} value={todo.Date} />
        {error ? <h4>Title and Details must have a minimum of 4 characters and a Date must be chosen</h4> : null}
        <button onClick={(e) => updateTodo(e)}>Update TODO</button>
      </form>
    </div>
    </>
  )
}

export default Edit