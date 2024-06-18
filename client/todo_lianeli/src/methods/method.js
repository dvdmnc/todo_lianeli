const url = 'http://localhost:1337/api/todos'
export const getTodos = () => fetch(url,{method:'GET'})
export const createTodo = (newTodo) => fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({"data":newTodo})
})
export const updateTodo = (id,updatedTodo) => fetch(`${url}/${id}`,{
method:'PUT',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({"data":updatedTodo})
})
export const deleteTodo = (id) => fetch(`${url}/${id}`,{
    method:'DELETE'
})