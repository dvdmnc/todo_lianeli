import * as methods from '../methods/method'

import Delete from '../images/effacer.png'
import Edit from '../images/crayon.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <button onClick={(e) => createTodo(e)}>Create TODO</button>
      </form>
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