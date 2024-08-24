import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const ref = useRef()

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if(todoString){
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem('todos',JSON.stringify(todos)) 
  }

  const handleEdit = (e,id) => {
    let td = todos.filter(item=>item.id===id)
    setTodo(td[0].todo)
    let newTodos = todos.filter(item=>item.id!=id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=> {item.id != id})
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    setTodos([...todos, newTodo]);
    setTodo("");
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    if(e.target.value.length>3){
      ref.current.backgroundColor = "red"
    }else{
      ref.current.backgroundColor = "black"
    }
  }

  const handleCheckBox = (e) => {
    let id = e.target.id
    let index = todos.findIndex(item => {
      return item.id == id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  const handleToggle = () => {
    setshowFinished(!showFinished)
  }
  


  return (
    <>
      <Navbar />
      <div className="container  mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manage yoor todos at one place</h1>
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2 px-3' />
          <button ref={ref} disabled={todo.length<3} onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6'>Add</button>
        </div>
        <input onChange={handleToggle} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Your todos</h2>
        <div className="todos">
          { todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div
              key={item.id} className="todo flex w-1/4 justify-between my-3 w-full">
                <div className="flex gap-2 w-1/2">
              <input onChange={handleCheckBox} id={item.id} type="checkbox" checked={item.isCompleted} />
              <div>
              <p className={item.isCompleted ? "line-through text-wrap" : "text-wrap"}>{item.todo}</p>
              </div>
                </div>
              <div className="buttons flex gap-1">
                <button onClick={(e)=> handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>

          })}
        </div>
      </div>

    </>
  )
}

export default App
