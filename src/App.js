import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header' // ./components/ must be used here as it's a folder containing components
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

    // Fetch all tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    }
    
    // Fetch specific task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }

    // Add Task
    const addTask = async (task) => {
      const res = await fetch('http://localhost:5000/tasks', { 
          method: 'POST', 
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])

      /*const id = Math.floor(Math.random() * 10000) + 1 // Giving new task random ID 
      const newTask = {id, ...task } // newTask = [(new id), task.text, task.day, task.reminder]
      setTasks([...tasks, newTask]) */
    }

    // Delete Task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

      setTasks(tasks.filter((task) => task.id !== id))
    }
    
    // Toggle Reminder
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder } : task))
    }

    return ( 
      <Router>
        <div className='container'>
          <Header 
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          <Route path='/' exact render={(props) => (
            <>
            {showAddTask && <AddTask onAdd={addTask} />}  
          {tasks.length > 0 ? (
            <Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder} /> ) : ( 'No Tasks To Show' )}
            </>
          )} />
          <Route path='/about' component={About} />
          <Footer />
        </div>
      </Router>
    )
}

export default App; // Exports App.js so it can be launched and hosted as a webpage


/*
'npm start' in terminal for react dev server
'npm run build' to build production version
'npm install -g' to install npm serve package globally if necessary
'serve -s build' to host build production locally (add -p (port) for a specific port)

'npm i json-server' 
"server": "json-server --watch db.json --port 5000" must be in package.json/scripts 
'npm run server'

'npm i react-router-dom' for routing
*/