import Pusher from 'pusher-js'

Pusher.logToConsole = true

class PusherInstance {
  pusher
  constructor() {
    this.pusher = new Pusher('a87015806fe65ab813b2', {
      cluster: 'ap2',
    })
  }

  getInstance() {
    return this.pusher
  }
}

export default new PusherInstance()
