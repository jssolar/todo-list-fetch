import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import './App.css'



const App = () => {

  const [apiURL] = useState('https://playground.4geeks.com/apis/fake/todos/user')
  const [users, setUsers] = useState(null)
  // [{ id: 1, task: "jssolar"}]
  const [task, setTask] = useState("")


  /**OBTENER TAREAS  USUARIO*/

  useEffect(() => {
    listUsers(`${apiURL}/JUANJO`)
  }, [])

  const listUsers = (
    url,
    options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ) => {
    fetch(url, options)
      .then((response) => {
        return response.json()
      }).then((responseJson) => {
        console.log(responseJson)
        setUsers(responseJson)

      }).catch((error) => {
        console.log(error)
      })
  }

  // /**CREACION DE USUARIO */
  const handleChange = (e) => {
    setTask(e.target.value)
  }

  //captura del evento del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    if (task === '')
      return
    const user = {
      task
    }

    const url = `${apiURL}/users`
    const options = {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    createUser(url, options)
  }

  const createUser = (url, options) => {
    fetch(url, options)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson)
        // setUsers(responseJson)
        if (responseJson.id) {
          setUsers((prevUsers) => {
            return [...prevUsers, responseJson]
          })
          setTask('')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }



  const handleDelete = id => {
    const url = `${apiURL}/users/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    deleteUser(url, options)
  }

  const deleteUser = (url, options) => {
    fetch(url, options)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson)
        listUsers(`${apiURL}/users`)
      })
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form className='form' onSubmit={handleSubmit} >
              <input type="text"
                className=' form-control'
                value={task}
                onChange={handleChange} />
              <button className="btn btn-dark w-100">
                Add Task
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-12">
          <ul className="list-group">
            {
              !!users &&
              users.length > 0 &&
              users.map((user) => {
                return (
                <li
                  key={user.id}
                  className='list-group-item d-flex justify-content-between task'>{user.task}<FaTrash
                    className='delete'
                    onClick={() => handleDelete(user.id)} />
              </li>)
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App


