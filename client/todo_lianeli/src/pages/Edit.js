import {React, useState} from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import * as methods from '../methods/method'
import Form from '../components/Form'

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
      <Form todo={todo} setTodo={setTodo} todoAction={updateTodo} error={error} action={'update'}/>
    </div>
    </>
  )
}

export default Edit