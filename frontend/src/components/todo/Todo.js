import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import './Todo.styles.css'

const Todo = ({ todo }) => {
  return (
    <div className='task'>
      <div className='text'>{todo.text}</div>
      <div className='icons'>
        <span className='icon'>
          <FontAwesomeIcon icon={faTrash} />
        </span>

        <span className='icon'>
          <FontAwesomeIcon icon={faPen} />
        </span>
      </div>
    </div>
  )
}

export default Todo