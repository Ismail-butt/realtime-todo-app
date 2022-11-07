import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
export const sidebarData = [
  {
    title: 'List Todo',
    icon: <FontAwesomeIcon icon={faHouse} />,
    link: '/',
  },
  {
    title: 'Add Todo',
    icon: <FontAwesomeIcon icon={faPlus} />,
    link: '/add-todo',
  },
]
