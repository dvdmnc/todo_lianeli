import * as methods from '../methods/method'

import Delete from '../images/effacer.png'
import Edit from '../images/crayon.png'

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';

function Home() {
    const navigate = useNavigate()

  const[todo,setTodo]=useState({
    Title:'',
  Details:'',
Date:''})

const[todos,setTodos]=useState([])

const [error,setError]=useState(false)

    const createTodo = async(event) => { //Create New Todo
      event.preventDefault();

      if(todo.Title.length < 4 || todo.Details.length < 4 || todo.Date.length < 4){ //Check min length and Date
        setError(true)
        setTimeout(() => setError(false), 3000)
        return
      }  

      try{
        const data = await methods.createTodo(todo)
        const res = await data.json()
        setTodos([...todos, res.data])
        setTodo({
          Title:'',
        Details:'',
      Date:''})
      }
      catch(err){
        alert('Unable to connect to the server, please check your connection or try later')
      }
    }

    useEffect(() => { //Get Todo List
      const fetchData = async() => {
        try{
          const result = await methods.getTodos()
          const data = await result.json()
          setTodos(data.data)
        }
        catch(err){
          alert('Unable to connect to the server to fetch the Todo List, please check your connection or try later')
        }
      } 
      fetchData()
    },[])


    const handleDelete = async(id) => { //Delete one Todo
      try{
        await methods.deleteTodo(id)
        const result = await methods.getTodos()
        const data = await result.json()
        setTodos(data.data)
      }
      catch(err){
        alert('Unable to connect to the server to delete TODO or fetch after deletion, please check your connection or try later')
      }
    }

  return (
    <>
    <header className='header'>
      Lianeli TODO App
    </header>
    <div className='input-todo'>
      <h3>
        Create your TODO right here :
      </h3>
      <Form setTodo={setTodo} todo={todo} todoAction={createTodo} error={error} action={'create'}/>
    </div>
    <div id='todo-display'>
    {
      todos.map((todo) => (
        <div key={todo.id} className='todo'>
          <div className='todo-header'>
            <h3>
              {todo.attributes.Title}
            </h3>
            <div>
                <img src={Edit} width={24} height={24} onClick={() => navigate('/edit',{state:todo})} />
                <img src={Delete} width={24} height={24} onClick={() => handleDelete(todo.id)}/>
            </div>
          </div>
          <p>{todo.attributes.Details}</p>
          <i>{todo.attributes.Date}</i>
        </div>
      ))
    }
    </div>
    </>
  );
}

export default Home;