import React from 'react'

function Form({todo,setTodo,todoAction, error, action}) {
  return (
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
        <button onClick={(e) => todoAction(e)}>{action == 'create' ? 'Create TODO' : 'Update Todo'}</button>
      </form>
  )
}

export default Form