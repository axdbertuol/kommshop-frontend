import amqp from 'amqplib'
import { headers } from 'next/headers'

const AMQP_URL = 'amqp://rabbitmq:5672'
// const QUEUE_NAME = '<your-queue-name>'
export async function POST(request: Request) {
  let responseBody = {}
  let responseInit = {}
  const headersList = headers()
  try {
    const json: { message: string; queue: string } = await request.json()

    const connection = await amqp.connect(AMQP_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(json.queue, { durable: true })
    channel.sendToQueue(json.queue, Buffer.from(json.message))

    responseInit = {
      status: 200,
      headers: { referer: headersList.get('referer') },
    }
    responseBody = { message: 'Message sent successfully.' }

    setTimeout(() => {
      connection.close()
    }, 500)
  } catch (error) {
    console.error('Error sending message:', error)
    responseInit = {
      status: 500,
      headers: { referer: headersList.get('referer') },
    }
    responseBody = { error: 'Failed to send message.' }
  }
  return new Response(JSON.stringify(responseBody), responseInit)
}
