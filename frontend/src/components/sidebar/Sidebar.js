import { useNavigate } from 'react-router-dom'
import { sidebarData } from './sidebarData'
import './Sidebar.styles.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const onClickHandler = (url) => {
    console.log('Clicked', url)
    // Navigate to the link
    navigate(url)
  }
  return (
    <div className='sidebar'>
      <ul className='sidebarList'>
        {sidebarData.map((val, key) => (
          <li
            key={key}
            className='row'
            id={window.location.pathname === val.link ? 'active' : ''}
            onClick={() => onClickHandler(val.link)}
          >
            <div id='icon'>{val.icon}</div>
            <div id='title'>{val.title}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
