import Pusher from 'pusher-js'

Pusher.logToConsole = true

const pusher = new Pusher('a87015806fe65ab813b2', {
  cluster: 'ap2',
})

export default pusher
