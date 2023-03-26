const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: process.env.useTLS,
})

const triggerPusherEvent = (channel, eventName, payload) => {
  pusher.trigger(channel, eventName, payload)
}

module.exports = {
  pusher,
  triggerPusherEvent,
}
