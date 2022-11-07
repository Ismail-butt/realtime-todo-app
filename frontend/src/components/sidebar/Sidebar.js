import { sidebarData } from './sidebarData'
import './Sidebar.styles.css'

const Sidebar = () => {
  const onClickHandler = (link) => {
    console.log('Clicked', link)
    // Navigate to the link
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
