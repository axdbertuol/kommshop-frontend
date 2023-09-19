'use server'
import amqp, { Channel, Connection } from 'amqplib'
import { from } from 'rxjs'

const AMQP_URL = 'amqp://rabbitmq:5672'
const RESPONSE_QUEUE_NAME = 'product_change'

export async function setupListener(queueName: string) {
  try {
    console.log('setting up')
    const connection = await amqp.connect(AMQP_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName ?? RESPONSE_QUEUE_NAME, { durable: true })
    console.log('Listener is set up and listening for responses.')
    return { connection, channel }
  } catch (error) {
    console.error('Error setting up the listener:', error)
    return Promise.reject()
  }
}

export async function observe() {
  return from(setupListener('')).subscribe(
    ({ channel }: { connection: Connection; channel: Channel }) => {
      let result
      return channel.consume(RESPONSE_QUEUE_NAME, (message) => {
        console.log('oi', message)
        if (message !== null) {
          const response = message.content.toString()
          console.log('Received response:', response)
          channel.ack(message)
          // Process the response as needed
          // TODO: websocket?
          result = JSON.parse(response)
          console.log('Received result:', result)
          return result
        }
      })
    }
  )
}
