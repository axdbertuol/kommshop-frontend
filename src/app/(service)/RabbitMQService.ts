import { Channel, Connection, ConsumeMessage, Replies, connect } from 'amqplib'
import { randomUUID } from 'crypto'

export class RabbitService {
  private amqpConnection: Connection | undefined

  private queueByCorrelIdMap = new Map<string, string>()
  private tempQueues = []
  IDLE_THRESHOLD = 5000

  async initiate() {
    return connect(process.env.RABBITMQ_URL ?? '').then(async (connection) => {
      this.amqpConnection = connection
      // this.channel = await connection.createChannel()
      console.log('Connected', connection)
      return connection
    })
  }

  async createChannel() {
    return this.amqpConnection?.createChannel()
  }

  isConnected() {
    return Boolean(this.amqpConnection)
  }

  async cleanUpQueues(channel: Channel) {
    for (const queue in this.queueByCorrelIdMap) {
      const queueInfo = await channel.checkQueue(queue)
      if (queueInfo?.messageCount === 0) {
        await channel?.deleteQueue(queue)
        this.tempQueues.pop()
        console.log(`Random queue '${queue}' deleted`)
      } else {
        console.log(`Random queue '${queue}' has messages, not deleting`)
      }
    }
  }

  async createAMQPRequest(
    exchangeName: string,
    exchangeType: string,
    exchangeRoutingKey: string,
    requestData: Omit<any, 'data'>
  ) {
    try {
      // Connect to the AMQP broker
      if (!this.amqpConnection) {
        connect(process.env.RABBITMQ_URL ?? '').then(async (connection) => {
          this.amqpConnection = connection
          // this.channel = await connection.createChannel()
          console.log('Connected', connection)
        })
      }
      const channel = await this.createChannel()
      if (!channel) return Promise.reject()
      // Generate a unique correlation ID for this request
      const correlationId = randomUUID()
      const responseQueue = await channel?.assertQueue('', {
        exclusive: true,
        durable: false,
        expires: this.IDLE_THRESHOLD,
        autoDelete: true,
      })

      await channel?.assertExchange(exchangeName, exchangeType)
      console.log('asfdsa', responseQueue)

      channel?.publish(
        exchangeName,
        exchangeRoutingKey,
        Buffer.from(JSON.stringify(requestData)),
        {
          correlationId,
          replyTo: responseQueue?.queue,
        }
      )
      return this.consumeAndProcess(responseQueue, correlationId, channel)
    } catch (error) {
      console.error('Error processing AMQP request:', error)
      return { error: 'Internal server error ' + error }
    }
  }

  async consumeAndProcess(
    responseQueue: Replies.AssertQueue | undefined,
    correlationId: string,
    channel: Channel
  ) {
    if (!responseQueue || !correlationId) return Promise.reject()
    return new Promise(async (resolve, reject) => {
      const take = async (msg: ConsumeMessage | null) => {
        try {
          if (!msg) {
            resolve({ error: true })
          } else if (msg.properties.correlationId === correlationId) {
            const content = JSON.parse(msg.content.toString())
            resolve(content)
          } else {
            reject(new Error('Invalid correlationId'))
          }
        } catch (error) {
          reject(error)
        }
      }

      channel
        .consume(responseQueue.queue, take, { noAck: true })
        .then(({ consumerTag }) => {
          setTimeout(async () => {
            await channel.cancel(consumerTag)
          }, 7000)
        })
        .catch(reject)
    })
  }
}
