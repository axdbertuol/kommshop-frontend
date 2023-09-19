// pages/api/fetch-product-updates.js
import { connect } from 'amqplib'
// import { headers } from 'next/headers'

export default async function GET() {
  try {
    // Connect to the AMQP broker
    const connection = await connect('amqp://rabbitmq:5672') // Replace with your broker URL
    const channel = await connection.createChannel()

    // Send request message to the broker
    const requestQueue = 'product_fetch'
    await channel.assertQueue(requestQueue)
    await channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify({ update: 'x' })))

    // Consume response message from the broker
    const responseQueue = 'response_queue'
    await channel.assertQueue(responseQueue)
    const response = await channel.get(responseQueue)
    // const headersList = headers()
    // const responseInit = {
    //   status: 200,
    //   headers: { referer: headersList.get('referer') },
    // }
    await channel.close()
    await connection.close()
    if (response) {
      const responseData = response.content.toString()
      console.log('Received response data from broker:', responseData)
      return responseData
    }
    return { error: 'No response received from broker' }
  } catch (error) {
    console.error('Error fetching product updates:', error)
    return { error: 'Unexpected error: ' + error }
  }
}
